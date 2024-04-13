// // Define an enum for ActionType
// enum ActionType {
// 	BulkDelete,
// 	Slowmode,

// 	Ban,
// 	Kick,
// 	Timeout,
// 	Warn,
// }

// class ModerationActionBuilder {
// 	author: User;
// 	reason?: string;

// 	constructor(author: User, reason?: string) {
// 		this.author = author;
// 		this.reason = reason;
// 	}

// 	bulkDelete({ targetChannel, number }: BulkDeleteActionOpts) {}
// }

// async function createModerationAction(
// 	author: User,
// 	execute: boolean,
// 	reason?: string
// ) {
// 	return {
// 		author,
// 		execute,
// 		reason,
// 	};
// }
