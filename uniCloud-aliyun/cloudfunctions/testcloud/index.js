'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {id}=event
	let res = await db.collection("zhongdianjiancedanweibiao").doc(id).get();
	return res;
};
