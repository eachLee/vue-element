<template>
  <div>
    <div class="main clearfix">
      <!-- v-if="activeName==='property'" -->

      <div class="contain">
        <!-- v-if="activeName==='property'&&propertyActiveName==='property'" -->
        <el-tabs
          class="property-list-tabs"
          type="card"
          v-model="propertyListActiveName"
          @tab-click="propertyHandleClick"
        >
          <el-tab-pane
            v-for="propertyListItem in propertyListTabs"
            :label="propertyListItem.title"
            :name="propertyListItem.value"
            :key="propertyListItem.value"
          ></el-tab-pane>
        </el-tabs>
        <el-form
          ref="form"
          class="search-box"
          :model="form"
          inline
          label-width="10"
        >
          <el-form-item label="城区">
            <el-select
              v-model="form.district"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="片区">

            <el-select
              v-model="form.area"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼盘名称">
            <el-select
              v-model="form.estateName"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="栋座单元">
            <el-select
              v-model="form.building"
              size=""
              placeholder="请选择"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房号">
            <el-select
              v-model="form.houseNo"
              size=""
              placeholder="请选择"
            >
              <el-option
                label="区域一"
                value="shanghai"
              ></el-option>
              <el-option
                label="区域二"
                value="beijing"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="mr0">
            <el-button
              type="primary"
              @click="onSubmit"
            >搜索</el-button>
            <el-button class="reset-btn">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form
          v-show="showMoreSearch"
          ref="form"
          class="more-search-box"
          :model="form"
          inline
          label-width="10"
        >
          <div class="form-controls selling-rent">
            <el-form-item
              class="w266"
              label="售价"
            >
              <el-col :span="10">
                <el-input
                  v-model="form.salePriceFrom"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >-</el-col>
              <el-col :span="10">
                <el-input
                  v-model="form.salePriceTo"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >万</el-col>
            </el-form-item>
            <el-form-item
              class="w266"
              label="租价"
            >
              <el-col :span="10">
                <el-input
                  v-model="form.rentPriceForm"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >-</el-col>
              <el-col :span="10">
                <el-input
                  v-model="form.rentPriceTo"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >元</el-col>
            </el-form-item>
            <el-form-item
              class="w292"
              label="建筑面积"
            >
              <el-col :span="10">
                <el-input
                  v-model="form.areaFrom"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >-</el-col>
              <el-col :span="10">
                <el-input
                  v-model="form.areaTo"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >平</el-col>
            </el-form-item>
            <el-form-item
              class="w266"
              label="楼层"
            >
              <el-col :span="11">
                <el-input
                  v-model="form.floorFrom"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col
                class="tc"
                :span="2"
              >-</el-col>
              <el-col :span="11">
                <el-input
                  v-model="form.floorTo"
                  placeholder="请输入"
                ></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="form-controls">
            <el-form-item>
              <el-select
                clearable
                v-model="form.deal"
                placeholder="全部交易"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.region"
                clearable
                placeholder="房屋现状"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.houseState"
                clearable
                placeholder="房屋状态"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.houseType"
                clearable
                placeholder="房型"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.filterType"
                clearable
                placeholder="手机"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.filterValue"
                clearable
                placeholder=""
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-controls">
            <el-form-item>
              <el-select
                v-model="form.propertyRightNature"
                clearable
                placeholder="产权性质"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.decorationSituation"
                clearable
                placeholder="装修情况"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.propertyUsage"
                clearable
                placeholder="房屋用途"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="w366 display-form-item">
              <el-select
                v-model="form.propertyChiefDept"
                clearable
                placeholder="房源归属部门名称"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.propertyChief"
                clearable
                placeholder="归属人名称"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-controls">
            <el-form-item>
              <el-select
                v-model="form.isHouse"
                clearable
                placeholder="住宅"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.preformanceStatement"
                clearable
                placeholder="售圈盘"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.preformanceUserName"
                clearable
                placeholder
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select
                v-model="form.propertyDateType"
                clearable
                placeholder="开盘日期"
              >
                <el-option
                  label="区域一"
                  value="shanghai"
                ></el-option>
                <el-option
                  label="区域二"
                  value="beijing"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="w366">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.propertyDateStart"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col
                class="line tc"
                :span="2"
              >-</el-col>
              <el-col :span="11">
                <el-date-picker
                  placeholder="选择时间"
                  v-model="form.propertyDateEnd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item
            class="w100p mb0 checkbox-item"
            label="朝　　向"
          >
            <el-checkbox-group v-model="form.orientation">
              <el-checkbox
                label="未知"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="东"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="西"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="南"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            class="w100p mb0 checkbox-item"
            label="建筑类型"
          >
            <el-checkbox-group v-model="form.buildingType">
              <el-checkbox
                label="联排别墅"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="顶层复式"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="高层"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="多层复式"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            class="w100p mb0 checkbox-item"
            label="行家成交"
          >
            <el-checkbox-group v-model="form.peerDeal">
              <el-checkbox
                label="链家"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="世华"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="乐有家"
                name="type"
              ></el-checkbox>
              <el-checkbox
                label="美联"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-divider @click="showMoreSearch=!showMoreSearch">
          <i
            v-if="!showMoreSearch"
            class="el-icon-arrow-down"
          ></i>
          <i
            v-else
            class="el-icon-arrow-up"
          ></i>
        </el-divider>
        <div class="edit-tools-box clearfix">
          <div class="edit-tools l">
            <el-button size="mini">跟进</el-button>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">交易调整</el-button>
            <el-button size="mini">转无效</el-button>
            <el-button size="mini">新增联系人</el-button>
            <el-button size="mini">发布出售</el-button>
            <el-button size="mini">发布出租</el-button>
          </div>
          <div class="r">
            <el-button size="mini">常用列设置</el-button>
            <i class="el-icon-s-grid"></i>
            <i class="el-icon-s-unfold"></i>
          </div>
        </div>
        <div class="data-table pt16">
          <el-table
            :data="tableData"
            style="width: 100%"
            highlight-current-row
          >
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column
              label="交易"
              width="60"
            >
              <template slot-scope="scope">
                <div class="deal">
                  <svg-icon
                    v-show="scope.row.deal==='租售'"
                    icon-class="rent-sale"
                  ></svg-icon>
                  <svg-icon
                    v-show="scope.row.deal==='售'"
                    icon-class="sale"
                  ></svg-icon>
                  <svg-icon
                    v-show="scope.row.deal==='租'"
                    icon-class="rent"
                  ></svg-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="楼盘名称"
              sortable
              show-overflow-tooltip
              min-width="180"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.estateName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="楼层"
              sortable
              show-overflow-tooltip
              width="80"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.floor }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="房型"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.houseType }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="售/租单价"
              sortable
              show-overflow-tooltip
              width="160"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.salePrice }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              show-overflow-tooltip
              width="60"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="带看"
              sortable
              show-overflow-tooltip
              width="80"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.takeSee }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="发布"
              sortable
              show-overflow-tooltip
              width="80"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.release }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最后跟进"
              sortable
              width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.followDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <div class="action">
                  <svg-icon
                    icon-class="list"
                    class-name="list-icon"
                  ></svg-icon>
                  <svg-icon
                    icon-class="telphone"
                    class-name="telphone-icon"
                  ></svg-icon>
                  <svg-icon
                    icon-class="key"
                    class-name="key-icon"
                  ></svg-icon>
                  <svg-icon
                    icon-class="photos"
                    class-name="photos-icon"
                  ></svg-icon>
                </div>
                <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            class="pt16 pb16"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="side-bar">
      <div class="side-bar-list">
        <div class="side-item">
          <svg-icon
            icon-class="pro-add"
            class-name="pro-add"
          ></svg-icon>
          <div>新增房源</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="search-rock"
            class-name="search-rock"
          ></svg-icon>
          <div>磐石小区</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="intel-station"
            class-name="intel-station"
          ></svg-icon>
          <div>情报站</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="pro-dm"
            class-name="pro-dm"
          ></svg-icon>
          <div>房源DM单</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="house-tool"
            class-name="house-tool"
          ></svg-icon>
          <div>户型工具</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="owner-temp"
            class-name="owner-temp"
          ></svg-icon>
          <div>业主模板</div>
        </div>
        <div class="side-item">
          <svg-icon
            icon-class="owner-data"
            class-name="owner-data"
          ></svg-icon>
          <div>业主数据</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ResetPagination from '@/components/ResetPagination'
import avatar from './../../assets/images/avatar.svg'


export default {
  name: 'home',
  components: {
    ResetPagination,
  },
  data() {
    return {
      activeName: 'property',
      tabsList: [{
        title: '首页',
        value: 'home'
      }, {
        title: '房源管理',
        value: 'property'
      }, {
        title: '云客中心',
        value: 'inquirty'
      }, {
        title: '网络管理',
        value: 'networkManage'
      }, {
        title: '个人中心',
        value: 'personalCenter'
      }, {
        title: '楼盘字典',
        value: 'estateDict'
      }, {
        title: '安全中心',
        value: 'securityCenter'
      }, {
        title: '报表中心',
        value: 'odc'
      }, {
        title: '联动新盘',
        value: 'linkageEstate'
      }, {
        title: '工商铺',
        value: 'uplink'
      }, {
        title: '经营分析',
        value: 'businessAnalysis'
      }],
      propertyActiveName: 'property',
      propertyTabsList: [{
        title: '通盘房源',
        value: 'property'
      }, {
        title: '推荐房源',
        value: 'recommendProperty'
      }, {
        title: '公盘池',
        value: 'publicProperty'
      }, {
        title: '房源贡献',
        value: 'propertyContribute'
      }, {
        title: '我的收藏',
        value: 'myCollect'
      }, {
        title: '我的推荐',
        value: 'myRecommend'
      }, {
        title: '跟进记录',
        value: 'followRecord'
      }, {
        title: '我的转介',
        value: 'myReferral'
      }, {
        title: '钥匙管理',
        value: 'keyManage'
      }, {
        title: '叫价记录',
        value: 'askPriceRecord'
      }, {
        title: '通话记录',
        value: 'callRecord'
      }, {
        title: '实勘审核',
        value: 'surveyVerify'
      }, {
        title: '委托审核',
        value: 'trustVerify'
      }, {
        title: '电子委托',
        value: 'trust'
      }, {
        title: '全景管理',
        value: 'fullViewManage'
      }, {
        title: '房源举报',
        value: 'propertyReport'
      }, {
        title: '开盘审核',
        value: 'openVerify'
      }],
      propertyListActiveName: 'esf',
      propertyListTabs: [{
        title: '二手盘',
        value: 'esf'
      }, {
        title: '商住盘',
        value: 'business'
      }, {
        title: '一手盘',
        value: 'ysf'
      }, {
        title: '临深盘',
        value: 'nearProperty'
      }, {
        title: '上数盘',
        value: 'upNumberProperty'
      }, {
        title: '数据盘',
        value: 'dataProperty'
      }],
      form: {
        district: '',
        area: '',
        estateName: '',
        building: '',
        houseNo: '',
        salePriceFrom: '',
        salePriceTo: '',
        rentPriceForm: '',
        rentPriceTo: '',
        buildingArea: '',
        floorFrom: '',
        floorTo: '',
        tradeType: '',
        houseState: '',
        propertyState: '',
        houseType: '',
        filterType: '',
        propertyRightNature: '',
        decorationSituation: '',
        propertyUsage: '',
        propertyChiefDept: '',
        propertyChief: '',
        isHouse: '',
        preformanceStatement: '',
        preformanceUserName: '',
        propertyDateType: '',
        propertyDateStart: '',
        propertyDateEnd: '',
        orientation: [],
        buildingType: [],
        peerDeal: [],
      },
      options: [{
        value: '选项1',
        label: '城区'
      }, {
        value: '选项2',
        label: '片区'
      }],
      showMoreSearch: false,
      tableData: [{
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租售',
      }, {
        estateName: '东方新天地广场C座1807',
        floor: '22/30',
        houseType: '2室2厅',
        area: '120平',
        salePrice: '335万',
        status: '有效',
        takeSee: 15,
        release: 20,
        orientation: '东南',
        followDate: '2016-05-02',
        deal: '租',
      }],
      //底部分页
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 2000
      },
    }
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
    },
    propertyHandleClick() {
      console.log(this.propertyActiveName);
    },
    propertyListHandleClick() {
      console.log(this.propertyListActiveName);
    },
    onSubmit() {
      console.log('submit!');
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }

  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-input__inner {
    background: #f5f5f5;
    border: 1px solid #f5f5f5;
  }
  ::v-deep
    .el-tabs--top
    .el-tabs--left
    > .el-tabs__header
    .el-tabs__item:nth-child(2) {
    padding-left: 10px;
  }
  .main-nav {
    .logo-red {
      position: absolute;
      padding-left: 18px;
      width: 90px;
      height: 36px;
    }
    .avatar {
      padding: 0 6%;
      cursor: pointer;
    }
  }
  ::v-deep .top-tabs {
    width: 1300px;
    margin: auto;
    .el-tabs__nav {
      float: right;
    }
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__item.is-active {
      font-weight: bold;
    }
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .contain {
      float: left;
      width: 1160px;
      padding: 20px;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0 12px 12px 12px;
      padding-top: 0;
      margin-top: 40px;
      background: #fff;
    }
    .reset-btn {
      background: #457b9d;
      color: #fff;
      border: none;
    }
    ::v-deep .sidebar {
      float: left;
      .el-tabs__header.is-left {
        background: #d85656;
        margin-right: 0;
        border-radius: 12px 12px 0 0;
      }
      .el-tabs__item.is-left {
        color: #fff;
        font-weight: bold;
        border: none;
        padding: 0 10px;
        margin: 0 10px;
        border-radius: 6px;
      }
      .el-tabs__item.is-left:first-child {
        border: none;
      }
      .el-tabs__item.is-active {
        background: #fff;
        color: #333;
      }
      .el-tabs__header .el-tabs__nav {
        border: none;
        padding: 10px 0;
      }
    }
    ::v-deep .property-list-tabs {
      > .el-tabs__header {
        border-bottom: none;
        margin-left: -20px;
        margin-top: -40px;
        .el-tabs__nav-wrap {
          overflow: initial;
        }
        .el-tabs__nav-scroll {
          overflow: initial;
          display: inline-block;
        }
        .el-tabs__nav {
          border: none;
        }
        .el-tabs__item {
          background: #f5f5f5;
          margin-top: 1px;
          border: none;
          border-radius: 12px 12px 0 0;
        }
        .el-tabs__item.is-active {
          background: #fff;
          color: #db5055;
          box-shadow: 0px -3px 5px 0px rgba(0, 0, 0, 0.1);
        }
      }
    }
    ::v-deep .search-box {
      .el-select,
      .el-input {
        width: 141px;
      }
      .el-form--inline .el-form-item {
        margin-bottom: 14px;
      }
    }
    ::v-deep .el-divider--horizontal {
      margin-top: 12px;
      .el-divider__text.is-center {
        cursor: pointer;
        font-size: 20px;
        color: #dcdcdc;
        padding: 0 10px;
      }
    }
    ::v-deep .more-search-box {
      .el-select,
      .el-input {
        width: 178px;
      }
      .el-form--inline .el-form-item {
        margin-bottom: 14px;
      }
      .display-form-item {
        .el-form-item__content,
        .el-select,
        .el-input {
          width: 100%;
        }
      }
      .selling-rent {
        .el-form-item__content {
          width: 85%;
        }
        .w292 .el-form-item__content {
          width: 76%;
        }
        .el-select,
        .el-input {
          width: 100%;
        }
      }
      .form-controls {
        .el-form-item:last-child {
          margin-right: 0;
        }
      }
      .checkbox-item {
        .el-checkbox {
          width: 90px;
        }
        .el-form-item__label {
          font-weight: bold;
        }
      }
    }
    .edit-tools-box {
      .el-button {
        background: #f5f5f5;
        color: #999999;
      }
      .el-button:hover {
        background: #fff;
        color: #db5055;
      }
      [class^="el-icon-"],
      [class*=" el-icon-"] {
        font-size: 16px;
        padding-left: 12px;
        color: #d8d8d8;
        cursor: pointer;
        vertical-align: middle;
      }
      [class^="el-icon-"]:hover,
      [class*=" el-icon-"]:hover {
        color: #db5155;
      }
    }
    ::v-deep .data-table {
      .el-table-column--selection .cell {
        padding-left: 10px;
      }
      th {
        background: #f5f5f5;
      }
      tr {
        height: 48px;
      }
      td {
        border-bottom: none;
      }
      .action .svg-icon {
        margin-right: 4px;
        cursor: pointer;
      }
      .deal .svg-icon {
        font-size: 28px;
      }
    }
  }
  .side-bar {
    width: 50px;
    height: 100%;
    background: rgb(255, 255, 255);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    right: 0;
    top: 0;
    .side-bar-list {
      position: absolute;
      top: 20%;

      .side-item {
        cursor: pointer;
        margin-bottom: 10px;
        text-align: center;
        padding: 0 8px;
        font-size: 12px;
        color: #adadad;
        .svg-icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
