<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="单号" prop="orderNumber">
            <el-input v-model="queryParams.orderNumber" placeholder="请输入单号" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="款式" prop="style">
            <el-select v-model="queryParams.style" placeholder="请选择" clearable size="small">
              <el-option v-for="dict in styleOptions" :key="dict.key" :label="dict.value" :value="dict.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="颜色" prop="color">
            <el-select v-model="queryParams.color" placeholder="请选择" clearable size="small">
              <el-option v-for="dict in colorOptions" :key="dict.key" :label="dict.value" :value="dict.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-select v-model="queryParams.region" placeholder="请选择" clearable size="small">
              <el-option v-for="dict in regionOptions" :key="dict.name" :label="dict.name" :value="dict.name" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button v-permisaction="['bj:quotations:add']" type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-permisaction="['bj:quotations:edit']" type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate">修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-permisaction="['bj:quotations:remove']" type="danger" icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete">删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="quotationsList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="单号" align="center" prop="orderNumber" :show-overflow-tooltip="true" />
          <el-table-column label="款式" align="center" prop="style" :formatter="styleFormat" width="100" />
          <el-table-column label="颜色" align="center" prop="color" :formatter="colorFormat" width="100" />
          <el-table-column label="长" align="center" prop="length" :show-overflow-tooltip="true" />
          <el-table-column label="宽" align="center" prop="width" :show-overflow-tooltip="true" />
          <el-table-column label="高" align="center" prop="height" :show-overflow-tooltip="true" />
          <el-table-column label="板厚" align="center" prop="thickness" :show-overflow-tooltip="true" />
          <el-table-column label="管重及额外重量" align="center" prop="pipeWeightAndExtraWeight" :show-overflow-tooltip="true" />
          <el-table-column label="数量" align="center" prop="quantity" :show-overflow-tooltip="true" />
          <el-table-column label="单个白铁重量" align="center" prop="singleIronWeight" :show-overflow-tooltip="true" />
          <el-table-column label="最终物流重量" align="center" prop="finalLogisticsWeight" :show-overflow-tooltip="true" />
          <el-table-column label="白铁价格" align="center" prop="ironPrice" :show-overflow-tooltip="true" />
          <el-table-column label="烤漆价格" align="center" prop="bakingPaintPrice" :show-overflow-tooltip="true" />
          <el-table-column label="是否需要丝印" align="center" prop="needSilkScreen" :formatter="needSilkScreenFormat" width="100" />
          <el-table-column label="开模板数" align="center" prop="numberOfOpenTemplates" :show-overflow-tooltip="true" />
          <el-table-column label="开板费" align="center" prop="openBoardFee" :show-overflow-tooltip="true" />
          <el-table-column label="丝印面数" align="center" prop="numberOfSilkScreenFaces" :show-overflow-tooltip="true" />
          <el-table-column label="印几个颜色" align="center" prop="numberOfColors" :show-overflow-tooltip="true" />
          <el-table-column label="印的价格" align="center" prop="printPrice" :show-overflow-tooltip="true" />

          <el-table-column label="供电类型" align="center" prop="powerSource" :show-overflow-tooltip="true" />
          <el-table-column label="灯带费用" align="center" prop="lightStripCost" :show-overflow-tooltip="true" />
          <el-table-column label="发光面数" align="center" prop="numberOfIlluminatedFaces" :formatter="formatNumberOfIlluminatedFaces" width="100" />
          <el-table-column label="白板价格" align="center" prop="whiteBoardPrice" :show-overflow-tooltip="true" />
          <el-table-column label="地区" align="center" prop="region" :formatter="regionFormat" width="100" />
          <el-table-column label="额外属性" align="center" prop="extraAttributes" :show-overflow-tooltip="true" />
          <el-table-column label="运费" align="center" prop="freight" :show-overflow-tooltip="true" />
          <el-table-column label="包装费" align="center" prop="packagingFee" :show-overflow-tooltip="true" />
          <el-table-column label="成本" align="center" prop="cost" :show-overflow-tooltip="true" />
          <el-table-column label="利润" align="center" prop="profit" :show-overflow-tooltip="true" />
          <el-table-column label="最终报价" align="center" prop="finalQuotation" :show-overflow-tooltip="true" />

          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-popconfirm class="delete-popconfirm" title="确认要修改吗?" confirm-button-text="修改" @confirm="handleUpdate(scope.row)">
                <el-button slot="reference" v-permisaction="['bj:quotations:edit']" size="mini" type="text" icon="el-icon-edit">修改</el-button>
              </el-popconfirm>
              <el-popconfirm class="delete-popconfirm" title="确认要删除吗?" confirm-button-text="删除" @confirm="handleDelete(scope.row)">
                <el-button slot="reference" v-permisaction="['bj:quotations:remove']" size="mini" type="text" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 导出按钮 -->
        <el-button type="primary" @click="exportToExcel">导出到Excel </el-button>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageIndex" :limit.sync="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="款式" prop="style">
              <el-select v-model="form.style" placeholder="请选择">
                <el-option v-for="dict in styleOptions" :key="dict.name" :label="dict.name" :value="dict.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="颜色" prop="color">
              <el-select v-model="form.color" placeholder="请选择">
                <el-option v-for="dict in colorOptions" :key="dict.name" :label="dict.name" :value="dict.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="长" prop="length">
              <el-input v-model="form.length" placeholder="长" />
            </el-form-item>
            <el-form-item label="宽" prop="width">
              <el-input v-model="form.width" placeholder="宽" />
            </el-form-item>
            <el-form-item label="高" prop="height">
              <el-input v-model="form.height" placeholder="高" />
            </el-form-item>

            <el-form-item label="板厚" prop="thickness">
              <el-select v-model="form.thickness" placeholder="请选择">
                <el-option v-for="dict in thicknessOptions" :key="dict.name" :label="dict.name" :value="dict.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="管重及额外重量" prop="pipeWeightAndExtraWeight">
              <el-input v-model="form.pipeWeightAndExtraWeight" placeholder="管重及额外重量" />
            </el-form-item>
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="form.quantity" placeholder="数量" />
            </el-form-item>
            <!-- <el-form-item label="单个白铁重量" prop="singleIronWeight">
                                        <el-input v-model="form.singleIronWeight" placeholder="单个白铁重量"
                                                      />
                                    </el-form-item> -->
            <el-form-item label="是否需要丝印" prop="needSilkScreen">
              <el-radio-group v-model="form.needSilkScreen">
                <el-radio v-for="dict in needSilkScreenOptions" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开模板数" prop="numberOfOpenTemplates">
              <el-input v-model="form.numberOfOpenTemplates" placeholder="开模板数" />
            </el-form-item>
            <el-form-item label="丝印面数" prop="numberOfSilkScreenFaces">
              <el-input v-model="form.numberOfSilkScreenFaces" placeholder="丝印面数" />
            </el-form-item>
            <el-form-item label="印几个颜色" prop="numberOfColors">
              <el-input v-model="form.numberOfColors" placeholder="印几个颜色" />
            </el-form-item>
            <el-form-item label="包装费" prop="packagingFee">
              <el-input v-model="form.packagingFee" placeholder="包装费" />
            </el-form-item>
            <el-form-item label="利润" prop="profit">
              <el-input v-model="form.profit" placeholder="利润" />
            </el-form-item>
            <el-form-item label="供电类型" prop="powerSource">
              <el-select v-model="form.powerSource" placeholder="选择供电类型">
                <el-option label="不发光" value="不发光" />
                <el-option label="插电" value="插电" />
                <el-option label="太阳能" value="太阳能" />
              </el-select>
            </el-form-item>
            <el-form-item label="灯带费用" prop="lightStripCost">
              <el-input v-model="form.lightStripCost" placeholder="灯带费用" readonly />
            </el-form-item>
            <el-form-item label="发光面" prop="numberOfIlluminatedFaces">
              <el-select v-model="form.numberOfIlluminatedFaces" placeholder="请选择发光面">
                <el-option label="不发光" :value="0" />
                <el-option label="单面" :value="1" />
                <el-option label="双面" :value="2" />
              </el-select>
            </el-form-item>
            <!-- el-form-item label="白板价格" prop="whiteBoardPrice">
                        <el-input v-model="form.whiteBoardPrice" placeholder="白板价格" />
                    </el-form-item-->
            <el-form-item label="地区" prop="region">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option v-for="dict in regionOptions" :key="dict.name" :label="dict.name" :value="dict.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="额外属性" prop="extraAttributes">
              <el-input v-model.lazy="form.extraAttributes" placeholder="额外属性" @change="formattedJson" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addQuotationsV1,
  delQuotationsV1,
  getQuotationsV1,
  listQuotationsV1,
  updateQuotationsV1
} from '@/api/bj/quotations-v1'
import XLSX from 'xlsx'
import {
  listStyles
} from '@/api/bj/styles'
import {
  listPaints
} from '@/api/bj/paints'
import {
  listThickness
} from '@/api/bj/thickness'
import {
  listRegions
} from '@/api/bj/regions'
// import {
//     transactionList
// } from '@/api/remote-search'
export default {
  name: 'QuotationsV1',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      quotationsList: [],
      needSilkScreenOptions: [],
      // 关系表类型
      styleOptions: [],
      colorOptions: [],
      regionOptions: [],
      thicknessOptions: [],
      // regionOptionsExp: [],
      extraAttributes: '{}',

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        orderNumber: undefined,
        style: undefined,
        color: undefined,
        region: undefined

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderNumber: [{
          required: true,
          message: '单号不能为空',
          trigger: 'blur'
        }],
        extraAttributes: [{
          validator: this.validateJson,
          trigger: 'change'
        }],
        style: [{
          required: true,
          message: '款式不能为空',
          trigger: 'blur'
        }],
        color: [{
          required: true,
          message: '颜色不能为空',
          trigger: 'blur'
        }],
        region: [{
          required: true,
          message: '地区不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    'form.powerSource': function(newValue) {
      this.calculateLightStripCost()
    },
    'form.length': function(newValue) {
      this.calculateLightStripCost()
    }
  },
  created() {
    this.getList()
    this.getStylesItems()
    this.getPaintsItems()
    this.getThicknessItems()
    this.getDicts('conf_yes_no').then(response => {
      this.needSilkScreenOptions = response.data
    })
    this.getRegionsItems()
  },
  methods: {
    exportToExcel() {
      const data = this.quotationsList.map(row => ({
        单号: row.orderNumber,
        地区: this.regionFormat(row),
        款式: this.styleFormat(row),
        颜色: this.colorFormat(row),
        长: row.length,
        宽: row.width,
        高: row.height,
        板厚: row.thickness,
        管重及额外重量: row.pipeWeightAndExtraWeight,
        数量: row.quantity,
        单个白铁重量: row.singleIronWeight,
        最终物流重量: row.finalLogisticsWeight,
        白铁价格: row.ironPrice,
        烤漆价格: row.bakingPaintPrice,
        是否需要丝印: this.needSilkScreenFormat(row),
        开模板数: row.numberOfOpenTemplates,
        开板费: row.openBoardFee,
        丝印面数: row.numberOfSilkScreenFaces,
        印几个颜色: row.numberOfColors,
        印的价格: row.printPrice,
        运费: row.freight,
        包装费: row.packagingFee,
        成本: row.cost,
        利润: row.profit,
        供电类型: row.powerSource,
        灯带费用: row.lightStripCost,
        发光面数: row.numberOfIlluminatedFaces,
        白板价格: row.whiteBoardPrice,
        额外属性: row.extraAttributes,
        最终报价: row.finalQuotation
      }))

      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '报价单')

      XLSX.writeFile(wb, '报价单.xlsx')
    },
    addExtFields() {
      const sources = [this.styleOptions, this.colorOptions, this.regionOptions, this.thicknessOptions]
      const sourceFields = [this.form.style, this.form.color, this.form.region, String(this.form.thickness)] // 和sources一一对应
      let selectedOptions = []
      // console.log("addExtFields - sources:", sources)
      // console.log("addExtFields - sourceFields:", sourceFields)

      // console.log("sourceFields:", sourceFields)
      // console.log("sources:",sources)
      for (let i = 0; i < sources.length; i++) {
        const options = sources[i].find(option => option.name === sourceFields[i])
        if (options) {
          console.log('addExtFields find ', sourceFields[i])
          selectedOptions = selectedOptions.concat(options)
        }
      }

      // 如果找到了，就设置所有的字段
      if (selectedOptions) {
        selectedOptions.forEach(selectedOption => {
          // console.log("addExtFields selectedOption:", selectedOption)
          for (const key in selectedOption) {
            if (Object.prototype.hasOwnProperty.call(selectedOption, key) && key !== 'name' && key !== 'id') {
              this.form[key] = selectedOption[key]
            }
          }
        })
      }
    },
    calculateLightStripCost() {
      switch (this.form.powerSource) {
        case '不发光':
          this.form.lightStripCost = 0
          break
        case '插电':
          this.form.lightStripCost = this.form.length / 100 * 6 + 4
          break
        case '太阳能':
          if (this.form.length > 100) {
            this.form.lightStripCost = 35
          } else {
            this.form.lightStripCost = 32
          }
          break
        default:
          break
      }
    },

    formattedJson() {
      try {
        const json = JSON.parse(this.form.extraAttributes)
        this.form.extraAttributes = JSON.stringify(json, null, 2)
        return JSON.stringify(json, null, 2)
      } catch (e) {
        return ''
      }
    },
    validateJson(rule, value, callback) {
      try {
        JSON.parse(value)
        callback()
      } catch (e) {
        callback(new Error('请输入正确的JSON格式'))
      }
    },
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listQuotationsV1(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.quotationsList = response.data.list
        this.total = response.data.count
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {

        id: undefined,
        style: undefined,
        color: undefined,
        length: undefined,
        width: undefined,
        height: undefined,
        thickness: undefined,
        pipeWeightAndExtraWeight: undefined,
        quantity: undefined,
        // singleIronWeight: undefined,
        needSilkScreen: undefined,
        numberOfOpenTemplates: undefined,
        numberOfSilkScreenFaces: undefined,
        numberOfColors: undefined,
        packagingFee: undefined,
        profit: undefined,
        powerSource: undefined,
        lightStripCost: undefined,
        numberOfIlluminatedFaces: undefined,
        whiteBoardPrice: undefined,
        region: undefined,
        extraAttributes: '{"exp": 1}'
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    styleFormat(row) {
      return this.selectItemsLabel(this.styleOptions, row.style)
    },
    colorFormat(row) {
      return this.selectItemsLabel(this.colorOptions, row.color)
    },
    needSilkScreenFormat(row) {
      return this.selectDictLabel(this.needSilkScreenOptions, row.needSilkScreen)
    },
    regionFormat(row) {
      return this.selectItemsLabel(this.regionOptions, row.region)
    },
    formatNumberOfIlluminatedFaces(row) {
      switch (row.numberOfIlluminatedFaces) {
        case 0:
          return '不发光'
        case 1:
          return '单面'
        case 2:
          return '双面'
        default:
          return '未定义' // 如果值不是预期的数字，返回原始值
      }
    },
    // 关系
    getStylesItems() {
      this.getItems(listStyles, undefined).then(res => {
        this.styleOptions = this.setItemsNew(res, ['name', 'price', 'weightFormula'], ['name', 'style_price', 'weight_formula'])
        console.log('styleOptions', this.styleOptions)
      })
    },
    getPaintsItems() {
      this.getItems(listPaints, undefined).then(res => {
        this.colorOptions = this.setItemsNew(res, ['name', 'price'], ['name', 'color_price'])
      })
    },
    getThicknessItems() {
      this.getItems(listThickness, undefined).then(res => {
        this.thicknessOptions = this.setItemsNew(res, ['thickness', 'tkKg'], ['name', 'thickness_weight'])
      })
    },
    getRegionsItems() {
      this.getItems(listRegions, undefined).then(res => {
        // this.regionOptions = this.setItems(res, 'name', 'name')
        this.regionOptions = this.setItemsNew(res, ['name', 'base1', 'base2'], ['name', 'location_base1', 'location_base2'])
      })
    },
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加报价单'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getQuotationsV1(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改QuotationsV1'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        this.form.length = Number(this.form.length)
        this.form.width = Number(this.form.width)
        this.form.height = Number(this.form.height)
        this.form.thickness = Number(this.form.thickness)
        this.form.pipeWeightAndExtraWeight = Number(this.form.pipeWeightAndExtraWeight)
        this.form.quantity = Number(this.form.quantity)
        this.form.needSilkScreen = Number(this.form.needSilkScreen)
        this.form.numberOfOpenTemplates = Number(this.form.numberOfOpenTemplates)
        this.form.numberOfSilkScreenFaces = Number(this.form.numberOfSilkScreenFaces)
        this.form.numberOfColors = Number(this.form.numberOfColors)
        this.form.packagingFee = Number(this.form.packagingFee)
        this.form.profit = Number(this.form.profit)
        this.form.lightStripCost = Number(this.form.lightStripCost)
        this.form.numberOfIlluminatedFaces = Number(this.form.numberOfIlluminatedFaces)
        // this.form.whiteBoardPrice = Number(this.form.whiteBoardPrice)

        if (valid) {
          // 附带值
          this.addExtFields()
          if (this.form.id !== undefined) {
            updateQuotationsV1(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addQuotationsV1(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delQuotationsV1({
          'ids': Ids
        })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {})
    }
  }
}
</script>
