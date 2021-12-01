import Mock from 'mockjs';

Mock.setup({
	timeout: '10-300'
})
let mockData = Mock.mock('/mock/form-data', 'get', {
	name: {
		first: '@FIRST',
		middle: '@FIRST',
		last: '@LAST',
		full: '@first @middle @last'
	},
	'formData|10-50': [{
		id() { return Math.random().toString(36).slice(2) },
		'type|1': ['input', 'select', 'radio', 'checkbox'],
		'name|+1': ['城区', '片区', '楼盘', '栋座', '房号', '房源属性', '楼层', '户型', '朝向', '建筑类型', '交易类型', '排序方式', '房源编号', '产权性质', '房屋用途',],
		'disabled|1-8': true,
		'url': '@url',
		value() {
			if (this.type === 'checkbox') {
				return [];
			} else {
				return '';
			}
		},
		options() {
			if (this.type === 'input') {
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
	}]
});
// console.log(mockData);
export default mockData