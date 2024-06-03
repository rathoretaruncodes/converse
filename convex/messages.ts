import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const sendTextMessage = mutation({
    args: {
        sender: v.string(),
        content: v.string(),
        conversation: v.id("conversations")
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new ConvexError("Not Authenticated");
        }

        const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        if(!user) {
            throw new ConvexError("User not found");
        }

        const conversation = await ctx.db
        .query("conversations")
        .filter(q => q.eq(q.field("_id"), args.conversation))
        .first();

        if(!conversation) {
            throw new ConvexError("Conversation not found");
        }

        if(!conversation.participants.includes(user._id)) {
            throw new ConvexError("You are not a part of the conversation");
        }

        await ctx.db.insert("messages", {
            sender: args.sender,
            content: args.content,
            conversation: args.conversation,
            messageType: "text",
        });

        // TODO: Add chatGPT check.
    },
});


export const getMessages = query({
    args: {
        conversation: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Not authenticated");
        }
        const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", q => q.eq("conversation", args.conversation))
        .collect();

        const messagesWithSender = await Promise.all(
            messages.map(async (message) => {
                const sender = await ctx.db
                .query("users")
                .filter(q => q.eq(q.field("_id"), message.sender))
                .first();

                return {...message, sender};
            })
        )
        return messagesWithSender;
    }
})