'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {
		id,
		worknum,
		totolmoney,
		tikitmoney,
		jiedaipeoplenum,
		freetikitnum,
		worknumgrowth,
		totolmoneygrowth,
		tikitmoneygrowth,
		jiedaipeoplegrowth,
		freetikitgrowth

	} = event

	let res = await db.collection("zhongdianjiancedanweibiao").doc(id).update({
		worknum,
		totolmoney,
		tikitmoney,
		jiedaipeoplenum,
		freetikitnum,
		worknumgrowth,
		totolmoneygrowth,
		tikitmoneygrowth,
		jiedaipeoplegrowth,
		freetikitgrowth
	})
	return res;
};