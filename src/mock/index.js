import Mock from 'mockjs';
const Random = Mock.Random;
console.log(Random);
Mock.setup({
	timeout: '10-300'
})
let mockData = Mock.mock('/mock/form-data', 'get', {
	name: {
		first: '@CFIRST',
		middle: '@CFIRST',
		last: '@CLAST',
		full: '@first@middle@last'
	},
	'formData|10-50': [{
		'id': '@GUID',
		'type|1': ['input', 'select', 'radio', 'checkbox'],
		'name|+1': ['城区', '片区', '楼盘', '栋座', '房号', '房源属性', '楼层', '户型', '朝向', '建筑类型', '交易类型', '排序方式', '房源编号', '产权性质', '房屋用途',],
		'disabled|1-8': true,
		value() {
			if (this.type === 'checkbox') {
				return [];
			} else {
				return '';
			}
		},
		'rows|2-5': 1,
		options() {
			if (this.type === 'input' || this.type === 'textarea') {
				return ''
			} else {
				return [{
					value: 0,
					label: '否'
				}, {
					value: 1,
					label: '是'
				}];
			}
		}
	}],
	tableData: {
		'theadList|8': [{
			'id': '@GUID',
			'label': '@CWORD(2,5)',
			'sortable|1-5': true,
			'fixed': false,
			'props|+1': ['checkbox', 'label', 'sales', 'region', 'city', 'count', 'date', 'status', 'opration'],
			width() {
				if (this.props === 'checkbox') {
					return 55;
				}
			}
		}],
		'tableList|3-50': [{
			'label': '@CTITLE',
			'id': '@GUID',
			'count|21-56': 1,
			'date': '@DATE(yyyy-MM-dd)',
			'opration': ['编辑', '打开', '删除', '重新上传', '新增'].slice(0, Math.random() * 5),
			'region': '@REGION',
			'city': '@CITY',
			'status|1': ['有效', '无效', '暂缓'],
			'sales': '@CNAME'
		}]
	}
});
export default mockData