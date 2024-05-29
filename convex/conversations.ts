import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createConversation = mutation({
    args: {
        participants: v.array(v.id("users")),
        isGroup: v.boolean(),
        groupName: v.optional(v.string()),
        groupImage: v.optional(v.id("_storage")),
        admin: v.optional(v.id("users")),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity)
            throw new ConvexError("Unauthorized");

        const existingConversation = await ctx.db
        .query("conversations")
        .filter(q => q.or(
            q.eq(q.field("participants"), args.participants),
            q.eq(q.field("participants"), args.participants.reverse())
            )
        ).first();

        if(existingConversation) {
            return existingConversation._id;
        }
        let groupImage;
        if(args.groupImage) {
            groupImage = (await ctx.storage.getUrl(args.groupImage)) as string;
        }

        // Creating 1 on 1 conversations
        const conversationId = await ctx.db.insert("conversations", {
            participants: args.participants,
            isGroup: args.isGroup,
            groupName: args.groupName,
            groupImage,
            admin: args.admin
        })
        return conversationId;
    }
})

export const getMyConversations = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) 
            throw new ConvexError("Unauthorized");

        const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", q=> q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

        if(!user)
            throw new ConvexError("User not found.");

        const conversations = await ctx.db.query("conversations").collect();

        const myConversations = conversations.filter((conversation) => {
            return conversation.participants.includes(user._id);
        });

        const conversationsWithDetails = await Promise.all(
            myConversations.map(async (conversation) => {
                const lastMessage = await ctx.db
                .query("messages")
                .filter((q) => q.eq(q.field("conversation"), conversation._id))
                .order("desc")
                .take(1)
            })
        )

        return myConversations;
    }
})

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})