import Mock from 'mockjs';
const Random = Mock.Random;
console.log(Random);
Mock.setup({
	timeout: '10-1000'
});
let typeArr = ['城区', '片区', '楼盘', '栋座', '房号', '房源属性', '楼层', '户型', '朝向', '建筑类型', '交易类型', '排序方式', '房源编号', '产权性质', '房屋用途',];
let mockData = {
	formData: Mock.mock('/mock/form-data', 'get', {
		'formData|10-50': [{
			'id': '@GUID',
			'index|+1': 1,
			'type|1': ['input', 'select', 'radio', 'checkbox'],
			'name|+1': typeArr,
			'disabled|1-8': true,
			precondition() {
				if (this.disabled) {
					//随机取一个元素用作前置条件
					let index = this.index;
					if (this.index > typeArr.length) {
						index = this.index % typeArr;
					}
					if (typeArr[index - 2] !== this.name) {
						return typeArr[index - 2];
					}
				}
			},
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
	}),
	tableData: Mock.mock('/mock/table-data', 'get', {
		'theadList|9': [{
			'id': '@GUID',
			'label': '@CWORD(2,5)',
			'sortable|1-5': true,
			'fixed': false,
			'props|+1': ['checkbox', 'label', 'sales', 'region', 'city', 'count', 'date', 'status', 'operation'],
			isLink() {
				return this.props === 'label';
			},
			isAction() {
				return this.props === 'operation';
			},
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
			'operation': [
				{ label: '编辑', value: 'edit' },
				{ label: '打开', value: 'open' },
				{ label: '删除', value: 'delete', },
				{ label: '重新上传', value: 'reupload' },
				{ label: '新增', value: 'add' }].slice(0, Math.round(Math.random() * 5)),
			'region': '@REGION',
			'url': '@URL',
			'city': '@CITY',
			'status|1': ['有效', '无效', '暂缓'],
			'sales': '@CNAME'
		}]
	}),
};
export default mockData