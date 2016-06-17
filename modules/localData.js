var localDataList = [{
	path: '/guofu/order/list',
	method: 'get',
	getData: buildOrderList
},{
	path: '/guofu/ajaxImageUpload',
	method: 'post',
	getData: buildAjaxImageUpload
},{
	path: '/guofu/app/add',
	method: 'post',
	getData: buildAppAdd
}];

module.exports = function(app){

	localDataList.forEach(function(localDataItem){
		var method = localDataItem.method||'get';
		app[method](localDataItem.path, function(req, res, next){
				console.log(req.host);
				res.header("Access-Control-Allow-Origin", 'http://mm.ffan.com:3001');
		    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type");
		    res.header("Access-Control-Allow-Credentials", true);
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,TRACE");
				res.header("Content-Type", "application/json;charset=utf-8");

				res.end( JSON.stringify({ 
					status: 200, 
					message: 'ok',
					data: localDataItem.getData(req.query) 
				}) );
			
		});
	});


};


function buildOrderList(query){
	var total = 132;
	var num = query.limit||20;
	var result = [];

	for(var i=0;i<num;i++){
		result.push({
			time: Date.now(),
			orderId: Math.round(Math.random()*100000),
			guofuId: Math.round(Math.random()*200),
			money: Math.round(Math.random()*100000) + 10,
			payStatus: Math.floor(Math.random()*3),
			refundStatus: Math.floor(Math.random()*2),
			from: Math.floor(Math.random()*2)
		})
	}
	return {
		list: result,
		totalCount: total
	};
}

function buildAjaxImageUpload(){
	return {
		status: 200,
		message: 'upload success',
		data: {
			url: 'http://gpay.com/s878fdsafq32lkjslkadjf.jpg'
		}
	}
}

function buildAppAdd(){
	return {
		appid: 's878fdsafq32lkjslkadjf',
		secretKey: '234234234'
	}
}