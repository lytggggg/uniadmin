'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let res = await db.collection("danweibiao").get();
	console.log(res)
	return res;
};
