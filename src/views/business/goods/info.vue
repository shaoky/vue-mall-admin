<template>
    <div class="shop-list goods-info page">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="商品属性管理" name="1">
                <el-form label-width="120px" style="width: 700px;">
                    <el-form-item label="商品名称：">
                        <el-input v-model="shopAttrForm.goodsName" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品副标题：">
                        <el-input v-model="shopAttrForm.goodsSubtitle" placeholder="商品副标题"></el-input>
                    </el-form-item>
                    <el-form-item label="商品品牌：">
                        <el-input v-model="shopAttrForm.brandName" :disabled="true" style="width: 200px;"></el-input>
                        <el-button type="primary" style="width: 100px; margin-top: 0;" @click="brandVisible = true">选择品牌</el-button>
                    </el-form-item>
                    <el-form-item label="商品视频链接：">
                        <el-input v-model="shopAttrForm.goodsVideo" placeholder="商品视频链接"></el-input>
                    </el-form-item>
                    <el-form-item label="商品来源：">
                        <el-input v-model="shopAttrForm.goodsSource" placeholder="商品来源" style="width: 120px; margin-right: 20px;"></el-input>
                        <span class="title">商品来源链接：</span>
                        <el-input v-model="shopAttrForm.goodsSourceUrl" placeholder="商品来源链接" style="width: 333px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品详情：">
                        <el-input type="textarea" v-model="shopAttrForm.goodsDesc" placeholder="商品详情"></el-input>
                    </el-form-item>
                    <el-form-item label="销量：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.saleCount"></el-input>
                    </el-form-item>

                    <el-form-item label="市场价：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.marketPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="平台价：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.shopPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="会员价：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.memberPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.goodsStock"></el-input>
                    </el-form-item>
                    <el-form-item label="库存预警：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.goodsStockWarn"></el-input>
                    </el-form-item>
                    <el-form-item label="起购量：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.goodsMinimum"></el-input>
                    </el-form-item>
                    <el-form-item label="限购量：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.goodsMaximun"></el-input>
                    </el-form-item>
                    <el-form-item label="计量单位：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.goodsAttrUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量：">
                        <el-input v-model.number="shopAttrForm.goodsWeight" style="width: 140px;"></el-input>
                        <el-select v-model="shopAttrForm.goodsWeightUnit" style="width: 100px;">
                            <el-option label="克" value="g"></el-option>
                            <el-option label="千克" value="kg"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="会员价格：" class="el-form-item-width">
                        <el-checkbox v-model="shopAttrForm.isMemberPrice"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="黄金会员：" class="el-form-item-width" v-if="shopAttrForm.isMemberPrice">
                        <el-input v-model.number="shopAttrForm.goldMemberPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="白金会员：" class="el-form-item-width" v-if="shopAttrForm.isMemberPrice">
                        <el-input v-model.number="shopAttrForm.platinaMemberPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="钻石会员：" class="el-form-item-width" v-if="shopAttrForm.isMemberPrice">
                        <el-input v-model.number="shopAttrForm.diamondMemberPrice"></el-input>
                    </el-form-item> -->

                    <el-form-item label="排序：" class="el-form-item-width">
                        <el-input v-model.number="shopAttrForm.sort"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-checkbox v-model="shopAttrForm.isFreeShipping">包邮</el-checkbox>
                        <el-checkbox v-model="shopAttrForm.isMemberGoods" style="margin-left: 20px;">升级会员商品</el-checkbox>
                        <el-checkbox v-model="shopAttrForm.isHotGoods" style="margin-left: 20px;">热门商品</el-checkbox>
                        <el-checkbox v-model="shopAttrForm.isSeckillGoods" style="margin-left: 20px;">抢购商品</el-checkbox>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="el-button-center fs20" @click="editShopAttr">修改</el-button>
            </el-tab-pane>
            <!-- 选择品牌 -->
            <el-dialog title="选择品牌" :visible.sync="brandVisible" width="500px" center>
                <el-table border :data="brandList" highlight-current-row @current-change="brandHandleCurrentChange">
                    <el-table-column label="品牌ID" prop="brandId"></el-table-column>
                    <el-table-column label="品牌名称" prop="brandName"></el-table-column>
                    <el-table-column label="品牌介绍" prop="brandDesc"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="brandVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSelectBrand">确 定</el-button>
                </span>
            </el-dialog>

            <el-tab-pane label="商品属性管理" name="2">
                <el-form>
                    <el-form-item>
                        <el-checkbox v-model="shopAttrForm.isGoodsSku" style="margin-left: 20px;">开启商品多规格</el-checkbox>
                    </el-form-item>
                </el-form>
                <el-tag v-if="shopAttrForm.isGoodsSku === true">商品属性</el-tag><br/>
                <el-form label-width="120px" style="width: 700px;" v-if="shopAttrForm.isGoodsSku === true">
                    <el-form-item
                        class="mt20"
                        :label="item.specName+'：'" v-for="(item, index) in goodsSpecList"
                        :key="index">
                        <el-checkbox-group v-model="item.value" @change="onSpec(item, item.value)">
                            <el-checkbox :label="item1" v-for="(item1, index1) in item.specContent" :key="index1">{{item1}}</el-checkbox>
                            <el-button size="mini" type="primary" style="margin-left: 20px;" v-if="item.specContent.length > 0" @click="delGoodsSkuSpecVisible = true, goodsSku.specList = item">删除</el-button>
                            <el-button size="mini" type="primary" style="margin-left: 20px;" @click="goodsSkuSpecVisible = true, goodsSku.attrIndex = index, goodsSku.specName = ''">新增</el-button>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item style="margin-left: -70px;">
                        <el-button size="mini" type="primary" style="margin-left: 20px;" v-if="goodsSpecList.length > 0" @click="delGoodsSkuAttrVisible = true">删除属性</el-button>
                        <el-button size="mini" type="primary" style="margin-left: 20px;" @click="goodsSkuAttrVisible = true, goodsSku.specName1 = '', goodsSku.attrName = ''">新增属性</el-button>
                    </el-form-item>
                </el-form>
                <table class="v-table" style="margin-left: 70px;" v-if="goodsSkuList.length > 0 && shopAttrForm.isGoodsSku === true">
                    <tr>
                        <th v-for="(item, index) in goodsSpecList" :key="index" width="80">{{item.specName}}</th>
                        <th>销售价格</th>
                        <th>商品库存</th>
                        <th>库存预警值</th>
                        <th>会员价</th>
                    </tr>
                    <tr v-for="(item, index) in goodsSkuList" :key="index">
                        <td v-for="(item1, index1) in item.text" :key="index1" :rowspan="item1.rowspan">{{item1.value}}</td>
                        <td><el-input v-model.number="item.shopPrice"></el-input></td>
                        <td><el-input v-model.number="item.goodsStock"></el-input></td>
                        <td><el-input v-model.number="item.goodsStockWarn"></el-input></td>
                        <td><el-input v-model.number="item.memberPrice"></el-input></td>
                    </tr>
                </table>
                <el-dialog title="新增属性" :visible.sync="goodsSkuAttrVisible" width="500px" center>
                    <el-form label-width="120px">
                        <el-form-item label="属性名称：">
                            <el-input v-model="goodsSku.attrName"></el-input>
                        </el-form-item>
                        <el-form-item label="新增第一个规格：">
                            <el-input v-model="goodsSku.specName1"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="goodsSkuAttrVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addGoodsSkuAttr">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="删除属性" :visible.sync="delGoodsSkuAttrVisible" width="500px" center>
                    <el-form label-width="120px">
                        <el-form-item label="属性名称：">
                            <el-checkbox-group v-model="goodsSku.delAttr">
                                <el-checkbox :label="item.specName" v-for="(item, index) in goodsSpecList" :key="index">{{item.specName}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="delGoodsSkuAttrVisible = false">取 消</el-button>
                        <el-button type="primary" @click="delGoodsSkuAttr">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="新增规格" :visible.sync="goodsSkuSpecVisible" width="500px" center>
                    <el-form label-width="120px">
                        <el-form-item label="规格名称：">
                            <el-input v-model="goodsSku.specName"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="goodsSkuAttrVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addGoodsSkuSpec">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="删除规格" :visible.sync="delGoodsSkuSpecVisible" width="500px" center>
                    <el-form label-width="120px">
                        <el-form-item label="规格名称：">
                            <el-checkbox-group v-model="goodsSku.delSpec">
                                <el-checkbox :label="item" v-for="(item, index) in goodsSku.specList.specContent" :key="index">{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="delGoodsSkuAttrVisible = false">取 消</el-button>
                        <el-button type="primary" @click="delGoodsSkuSpec">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- <el-tag class="mt20">属性图片</el-tag>
                <el-form label-width="120px">
                    <el-form-item label="选择属性：">
                        <el-radio-group v-model="shopAttrForm.goodsSkuImageAttr" @change="onGoodsSkuImageSpec">
                            <el-radio :label="item.specName" v-for="(item, index) in goodsSpecList" :key="index">{{item.specName}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form> -->
                <!-- <table class="v-table" style="margin-left: 70px; margin-top: 20px;" v-if="goodsSkuList.length > 0">
                    <tr>
                        <th>颜色</th>
                        <th>图片</th>
                    </tr>
                    <tr v-for="(item, index) in goodsSkuImage.value" :key="index">
                        <td>{{item}}</td>
                        <td>
                            <el-upload
                                class="avatar-uploader"
                                :action="imgBaseUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="goodsSkuImageList[index].goodsImage" :src="goodsSkuImageList[index].goodsImage" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </td>
                    </tr>
                </table> -->
                <!-- 商品参数 -->
                <el-tag class="mt20">商品参数</el-tag>
                <div class="shop-params mt20">
                    <el-form label-width="120px" style="width: 700px;">
                        <el-form-item
                            :label="item.attrName+'：'" v-for="(item, index) in goodsAttrList"
                            :key="index"
                            :required="item.isRequired == 1 ? true : false">
                            <el-input v-model="item.value" v-if="item.attrType === 1" style="width: 250px;"></el-input>
                            <el-radio-group v-model="item.value" v-if="item.attrType === 2">
                                <el-radio :label="item1" v-for="(item1, index1) in item.attrContent" :key="index1">{{item1}}</el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-model="item.value"  v-if="item.attrType === 3">
                                <el-checkbox :label="item1" v-for="(item1, index1) in item.attrContent" :key="index1">{{item1}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <el-tag>商品相册</el-tag>
                <!-- 商品图片 -->
                <div class="shop-image">
                    <!-- 商品缩略图 -->
                    <h3 class="mainImage">缩略图，推荐尺寸300*300，正方形图片展示效果更佳（商品列表展示使用）</h3>
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleGoodsthumbSuccess">
                        <img v-if="shopAttrForm.goodsImage" :src="shopAttrForm.goodsImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <!-- 热门商品 -->
                    <h3 class="mainImage mt20">封面图，推荐尺寸693*340，长方形（首页商品列表使用）</h3>
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleGoodsCoverSuccess">
                        <img v-if="shopAttrForm.goodsCover" :src="shopAttrForm.goodsCover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <div class="main-image mt20">
                        <div class="title">轮播图，推荐尺寸750*750</div>
                        <div class="content">
                            <el-upload
                                :action="imgBaseUrl"
                                multiple
                                :file-list="fileList"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :onSuccess="uploadSuccess"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="info-image">
                        <div class="title">详情图，推荐尺寸750*750（这里宽度750，高度可以自适应的，没有关系）</div>
                        <div class="content">
                            <el-upload
                                :action="imgBaseUrl"
                                :file-list="fileList1"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :onSuccess="uploadSuccess1"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-button type="primary" class="el-button-center fs20" @click="editShopAttr">提交</el-button>
                </div>
            </el-tab-pane>
            <!-- 商品关联 -->
            <el-tab-pane label="商品合集关联" name="3">
                <el-button type="primary" @click="addGoodsSeriesBtn()">新增关联商品</el-button>
                <el-button type="primary" @click="goodsSeriesUpdateVisible = true">编辑合集内容</el-button>
                <el-table border :data="goodsSeriesList" class="mt20">
                    <el-table-column label="商品标题" prop="goodsName"></el-table-column>
                    <el-table-column label="商品图片" prop="imageUrl">
                        <template slot-scope="scope">
                            <img :src="scope.row.goodsImage" style="max-height: 80px; margin:0 auto; display: block;">
                        </template>
                    </el-table-column>
                    <el-table-column label="商品排序" prop="seriesSort">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.seriesSort" @blur="seriesSortBlur(scope.row.seriesId, scope.row.seriesSort)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button @click="goodsSeriesUpdateVisible = true" type="text" >编辑</el-button> -->
                            <el-button @click="deleteGoodsSeries(scope.row.seriesId)" type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="编辑" :visible.sync="goodsSeriesUpdateVisible" width="500px" center>
                    <el-form label-width="120px">
                        <el-form-item label="合集标题：">
                            <el-input v-model="shopAttrForm.seriesTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="合集内容：">
                            <el-input v-model="shopAttrForm.seriesContent"></el-input>
                        </el-form-item>
                        <el-form-item label="是否开启合集">
                            <el-checkbox v-model="shopAttrForm.isOpenSeries"></el-checkbox>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="goodsSeriesUpdateVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editShopAttr">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 分页 -->
                <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="goodsSeriesCount"></pagination>
                <el-dialog title="商品列表" :visible.sync="goodsVisible" width="700px" center>
                    <el-form :inline="true">
                        <el-form-item label="商品名称：">
                            <el-input v-model="goodsSearch.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addGoodsSeriesBtn()">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table ref="multipleTable" border :data="goodsList" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="商品标题" prop="goodsName"></el-table-column>
                        <el-table-column label="商品图片" prop="imageUrl">
                            <template slot-scope="scope">
                                <img :src="scope.row.goodsImage" style="max-height: 80px; margin:0 auto; display: block;">
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <pagination @handleCurrentChange='handleCurrentChange2' @handleSizeChange="handleSizeChange2"  :total="goodsListCount"></pagination>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="goodsVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addGoodsSeries">确 定</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env'
import { getGoodsInfo, updateGoods, addGoodsImage, delGoodsImage, getGoodsAttr,
    getGoodsSeriesList, getGoodsList, addGoodsSeries, deleteGoodsSeries, updateGoodsSeries, getGoodsBrandList, getGoodsTypeBasisInfo
} from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
import _ from 'lodash'

export default {
    mixins: [status],
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            no: null,
            brandVisible: false,
            brandList: [],
            activeName: '1',
            isInputGoodsName: true,
            shopAttrForm: {
                goodsName: ''
            },
            data: {
                detail: {}
            },
            // 商品属性
            // goodsAttrList: [],
            shopAttr: {},
            unitList: [{
                value: 1,
                label: '瓶'
            }, {
                value: 2,
                label: '箱'
            }],

            // 图片
            dialogVisible: false,
            dialogImageUrl: '',
            fileList: [],
            fileList1: [],
            fileList2: [],
            shopImgForm: {
                goodsId: '', // 第二步确认后，得到的no
                imageUrl: '',
                type: 1 // 1轮播图，2详情图
            },
            /**
             * 商品关联
             */
            goodsSeriesSearch: {goodsId: null, page: 1, size: 20},
            goodsSeriesList: [],
            goodsSeriesCount: 0,
            /** 商品列表 */
            goodsVisible: false,
            goodsList: [],
            goodsSearch: {
                page: 1,
                size: 20,
                isMemberGoods: null
            },
            goodsListCount: 0,
            goodsSelectionList: [],
            goodsForm: {
                goodsId: null,
                goodsIds: []
            },
            seriesForm: {
                goodsId: null,
                serviesSort: null
            },
            goodsSeriesUpdateVisible: false,
            goodsSpecList: [],
            goodsAttrList: [],
            goodsSkuList: [],
            goodsSkuList1: [],
            goodsSku: {
                attrName: '',
                specName1: '',
                specName: '',
                delAttr: [],
                specList: [],
                delSpec: []
            },
            goodsSkuImage: [],
            goodsSkuAttrVisible: false,
            goodsSkuSpecVisible: false,
            delGoodsSkuAttrVisible: false,
            delGoodsSkuSpecVisible: false,
            goodsSkuImageValue: '',
            goodsSkuImageList: []
        }
    },
    mounted () {
        this.goodsId = parseInt(this.$route.query.goodsId)
        this.shopImgForm.goodsId = this.goodsId
        this.goodsSeriesSearch.goodsId = this.goodsId
        this.goodsForm.goodsId = this.goodsId
        this.goodsInfo()
        this.getGoodsBrandList()
    },
    methods: {
        async goodsInfo () {
            let res = await getGoodsInfo({goodsId: this.goodsId})
            if (res.code === 200) {
                this.shopAttrForm = res.data.info
                // console.log(this.getBoolean)
                this.shopAttrForm.isGoodsSku === 0 ? this.shopAttrForm.isGoodsSku = false : this.shopAttrForm.isGoodsSku = true
                this.shopAttrForm.isFreeShipping === 0 ? this.shopAttrForm.isFreeShipping = false : this.shopAttrForm.isFreeShipping = true
                this.shopAttrForm.isMemberGoods === 0 ? this.shopAttrForm.isMemberGoods = false : this.shopAttrForm.isMemberGoods = true
                this.shopAttrForm.isHotGoods === 0 ? this.shopAttrForm.isHotGoods = false : this.shopAttrForm.isHotGoods = true
                this.shopAttrForm.isOpenSeries === 0 || this.shopAttrForm.isOpenSeries === null ? this.shopAttrForm.isOpenSeries = false : this.shopAttrForm.isOpenSeries = true
                this.shopAttrForm.isSeckillGoods === 0 || this.shopAttrForm.isSeckillGoods === null ? this.shopAttrForm.isSeckillGoods = false : this.shopAttrForm.isSeckillGoods = true

                let fileList = [] // 轮播图
                let fileList1 = [] // 详情图
                // let fileList2 = [] // sku
                res.data.info.goodsBannerList.forEach(item => {
                    fileList.push({
                        id: item.id,
                        url: item.imageUrl
                    })
                })
                res.data.info.goodsDetailList.forEach(item => {
                    fileList1.push({
                        id: item.id,
                        url: item.imageUrl
                    })
                })
                // res.data.info.goodsSkuImageList.forEach(item => {
                //     fileList2.push({
                //         id: item.id,
                //         url: item.imageUrl
                //     })
                // })

                this.fileList = fileList
                this.fileList1 = fileList1
                // this.fileList2 = fileList2
            }
            let goodsSpecList = JSON.parse(res.data.info.goodsSpecList)
            /**
             * 获取商品属性
             */
            let res1 = await getGoodsTypeBasisInfo({goodsClassId: res.data.info.goodsClassId})
            let goodsAttrList = res1.data.goodsAttr

            // 商品属性，遍历赋值
            let goodsAttr = JSON.parse(res.data.info.goodsAttr)
            for (let item of goodsAttr) {
                for (let item1 of goodsAttrList) {
                    if (item1.attrName === item.attrName) {
                        if (item.attrType === 3) {
                            item1.value = item.value.split(',')
                        } else {
                            item1.value = item.value
                        }
                    }
                }
            }

            // 商品规格，遍历赋值
            let goodsSpec = JSON.parse(res.data.info.goodsSpec)
            for (let item of goodsSpec) {
                for (let item1 of goodsSpecList) {
                    if (item1.specName === item.name) {
                        item1.value = item.subList
                    }
                }
            }
            this.goodsAttrList = goodsAttrList
            this.goodsSpecList = goodsSpecList
            this.goodsSkuList = res.data.info.goodsSkuList
            this.goodsSkuList1 = res.data.info.goodsSkuList1
            if (this.goodsSkuList.length > 0) {
                this.onSpec()
            }
            // this.onGoodsSkuImageSpec(res.data.info.goodsSkuImageAttr)
        },
        async getGoodsBrandList () {
            let res = await getGoodsBrandList()
            this.brandList = res.data.list
        },
        onSelectBrand () {
            this.brandVisible = false
        },
        brandHandleCurrentChange (item) {
            this.shopAttrForm.goodsBrandId = item.brandId
            this.shopAttrForm.brandName = item.brandName
        },

        // 编辑商品
        async editShopAttr () {
            // let form = this.shopAttrForm
            // let goodsAttrList = this.goodsAttrList.map(item => {
            //     return {
            //         attrName: item.attrName,
            //         value: item.value
            //     }
            // })

            // form.goodsAttr = JSON.stringify(goodsAttrList)

            let form = {...this.shopAttrForm}
            let isNext = true
            let goodsAttrList = this.goodsAttrList.map(item => {
                if (item.isRequired === 1 && item.value === '') {
                    isNext = false
                    this.$notify({
                        title: '错误',
                        message: '请填写' + item.attrName,
                        type: 'error'
                    })
                }
                let value = item.value
                if (item.attrType === 3 && item.value) {
                    value = value.join(',')
                }
                return {
                    attrName: item.attrName,
                    value: value,
                    attrType: item.attrType
                }
            })
            if (!isNext) {
                return
            }
            form.goodsAttr = JSON.stringify(goodsAttrList)

            // sku规格
            form.goodsSkuList = this.goodsSkuList1.map((item, index) => {
                return {
                    goodsStock: this.goodsSkuList[index].goodsStock,
                    goodsStockWarn: this.goodsSkuList[index].goodsStockWarn,
                    memberPrice: this.goodsSkuList[index].memberPrice,
                    shopPrice: this.goodsSkuList[index].shopPrice,
                    textValue: JSON.stringify(item.text)
                }
            })
            let goodsSpec = this.goodsSpecList.map(item => {
                return {
                    // id: item.specId,
                    name: item.specName,
                    subList: item.value
                }
            })
            form.goodsSpec = JSON.stringify(goodsSpec)

            let goodsSpecList = this.goodsSpecList.map(item => {
                return {
                    // specId: item.specId,
                    specName: item.specName,
                    specContent: item.specContent
                }
            })
            form.goodsSpecList = JSON.stringify(goodsSpecList)

            try {
                let res = await updateGoods(form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                }
            } catch (err) {}

            // this.shopImgForm.no = res.data.no
        },

        // 主图
        async handleGoodsthumbSuccess (res, file) {
            this.shopAttrForm.goodsImage = res.data.url
        },
        async handleGoodsCoverSuccess (res, file) {
            this.shopAttrForm.goodsCover = res.data.url
        },

        // 轮播图
        handleRemove (file, fileList) {
            console.log(file, fileList)
            this.delShopImage(file.id)
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        // 轮播图
        uploadSuccess (response, file, fileList) {
            console.log(response, file, fileList)
            this.shopImgForm.imageUrl = response.data.url
            this.shopImgForm.type = 1
            this.addImage()
        },
        // 详情图
        uploadSuccess1 (response, file, fileList) {
            // console.log(response, file, fileList)
            this.shopImgForm.imageUrl = response.data.url
            this.shopImgForm.type = 2
            this.addImage()
        },
        async addImage () {
            let res = await addGoodsImage(this.shopImgForm)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.goodsInfo()
            }
        },

        async delShopImage (id) {
            let res = await delGoodsImage({id: id})
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
            }
        },

        goShopInfo () {
            this.editShopAttr()
            this.$router.go(-1)
        },

        handleClick (tab, event) {
            // console.log(tab, event)
            if (tab.name === '3') {
                this.getGoodsSeriesList()
            }
        },
        /**
         * 关联商品
         */
        async addGoodsSeriesBtn () {
            this.goodsSearch.isMemberGoods = this.shopAttrForm.isMemberGoods
            let res = await getGoodsList(this.goodsSearch)
            this.goodsList = res.data.list
            this.goodsListCount = res.data.count
            this.goodsVisible = true
        },
        async deleteGoodsSeries (id) {
            let res = await deleteGoodsSeries({seriesId: id})
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.getGoodsSeriesList()
            }
        },
        // 弹出框
        handleSelectionChange (value) {
            this.goodsSelectionList = value
        },
        async addGoodsSeries () {
            let arr = []
            for (let item of this.goodsSelectionList) {
                arr.push(item.goodsId)
            }
            this.goodsForm.goodsIds = arr
            let res = await addGoodsSeries(this.goodsForm)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.goodsVisible = false
                this.getGoodsSeriesList()
            }
        },
        async getGoodsSeriesList () {
            let res = await getGoodsSeriesList(this.goodsSeriesSearch)
            this.goodsSeriesList = res.data.list
            this.goodsSeriesCount = res.data.count
        },
        async seriesSortBlur (seriesId, value) {
            let form = {
                seriesId: seriesId,
                seriesSort: parseInt(value)
            }
            let res = await updateGoodsSeries(form)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.getGoodsSeriesList()
            }
        },
        handleCurrentChange (val) {
            this.goodsSearch.page = val
            this.getGoodsSeriesList()
        },
        handleSizeChange (val) {
            this.goodsSearch.size = val
            this.getGoodsSeriesList()
        },
        handleCurrentChange2 (val) {
            this.goodsSearch.page = val
            this.addGoodsSeriesBtn()
        },
        handleSizeChange2 (val) {
            this.goodsSearch.size = val
            this.addGoodsSeriesBtn()
        },
        onGoodsSkuImageSpec (value) {
            this.shopAttrForm.goodsSkuImageAttr = value
            this.goodsSkuImage = _.find(this.goodsSpecList, function (o) { return o.specName === value })
        },
        addGoodsSkuAttr () {
            if (this.goodsSku.specName1 === '') {
                this.$notify({
                    title: '错误',
                    message: '请填写规格',
                    type: 'error'
                })
                return
            }
            let obj = {
                // id: null,
                specName: this.goodsSku.attrName,
                specContent: [this.goodsSku.specName1],
                value: [this.goodsSku.specName1]
            }
            this.goodsSpecList.push(obj)
            this.onSpec()
            this.goodsSkuAttrVisible = false
        },
        delGoodsSkuAttr () {
            let arr = []
            for (let item of this.goodsSpecList) {
                for (let item1 of this.goodsSku.delAttr) {
                    if (item1 === item.specName) {
                        arr.push(item)
                    }
                }
            }
            _.pullAll(this.goodsSpecList, arr)
            this.onSpec()
            this.delGoodsSkuAttrVisible = false
        },
        addGoodsSkuSpec (id) {
            this.goodsSpecList[this.goodsSku.attrIndex].specContent.push(this.goodsSku.specName)
            this.goodsSkuSpecVisible = false
        },
        delGoodsSkuSpec () {
            for (let item of this.goodsSpecList) {
                if (item.specName === this.goodsSku.specList.specName) {
                    _.pullAll(item.specContent, this.goodsSku.delSpec)
                }
            }

            this.onSpec()
            this.delGoodsSkuSpecVisible = false
        },
        goodsSkuHandleSuccess (response, file, fileList) {
            console.log(response, file, fileList)
        },
        goodsSkuHandlePreview (file) {
            console.log(file)
        },
        goodsSkuHandleRemove (file, fileList) {
            console.log(file, fileList)
        },
        onSpec (item, value) {
            let goodsSkuList = [] // 用于表格合并
            let goodsSkuList1 = [] // 用于保存全部的规格
            let numsArr = []
            let idxArr = []
            this.goodsSpecList.forEach((item, index) => {
                numsArr.push(item.value.length)
                idxArr[index] = 0
            })

            let len = 1
            let rowsArr = []
            for (let i = 0; i < numsArr.length; i++) {
                len = len * numsArr[i]

                let tmpnum = 1
                for (let j = numsArr.length - 1; j > i; j--) {
                    tmpnum = tmpnum * numsArr[j]
                }
                rowsArr.push(tmpnum)
            }

            for (var i = 0; i < len; i++) {
                let text = []
                let text1 = []
                // let rowspan = 0
                for (let j = 0; j < this.goodsSpecList.length; j++) {
                    let n = parseInt(i / rowsArr[j])
                    if (j === 0) {
                    } else if (j === this.goodsSpecList.length - 1) {
                        n = idxArr[j]
                        if (idxArr[j] + 1 >= numsArr[j]) {
                            idxArr[j] = 0
                        } else {
                            idxArr[j]++
                        }
                    } else {
                        let m = parseInt(i / rowsArr[j])
                        n = m % numsArr[j]
                    }
                    let obj = {
                        value: this.goodsSpecList[j].value[n]
                    }
                    if (i % rowsArr[j] === 0) {
                        obj.rowspan = rowsArr[j]
                        text.push(obj)
                    }
                    text1.push(this.goodsSpecList[j].value[n])
                }

                let sku = {
                    text: text,
                    shopPrice: 0,
                    goodsStock: 0,
                    goodsStockWarn: 10,
                    memberPrice: 0
                }

                let sku1 = {...sku, text: text1}
                goodsSkuList.push(sku)
                goodsSkuList1.push(sku1)
            }

            // for (let item of goodsSkuList1) {
            goodsSkuList1.forEach((item, index) => {
                let text = []
                for (let item1 of item.text) {
                    text.push(item1)
                }
                for (let item2 of this.goodsSkuList1) {
                    let text1 = []
                    for (let item3 of item2.text) {
                        text1.push(item3)
                    }
                    if (text1.toString() === text.toString()) {
                        console.log(goodsSkuList[index])
                        goodsSkuList[index].shopPrice = item2.shopPrice
                        goodsSkuList[index].goodsStock = item2.goodsStock
                        goodsSkuList[index].goodsStockWarn = item2.goodsStockWarn
                        goodsSkuList[index].memberPrice = item2.memberPrice
                        item.shopPrice = item2.shopPrice
                        item.goodsStock = item2.goodsStock
                        item.goodsStockWarn = item2.goodsStockWarn
                        item.memberPrice = item2.memberPrice
                    }
                }
            })

            for (let item of this.goodsSpecList) {
                if (item === '颜色') {

                }
            }
            // goodsSkuList.forEach((item, index) => {
            //     item.shopPrice = this.goodsSkuList[index].shopPrice
            //     item.goodsStock = this.goodsSkuList[index].goodsStock
            //     item.goodsStockWarn = this.goodsSkuList[index].goodsStockWarn
            //     item.memberPrice = this.goodsSkuList[index].memberPrice
            // })
            this.goodsSkuList = goodsSkuList
            this.goodsSkuList1 = goodsSkuList1
        }
    },
    components: {
        pagination
    }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/define.less";
    td{vertical-align: middle;}
    .el-form-item-width{width: 360px;}

    .el-button-center{margin-top: @rem*200;}
    /*商品图片*/
    .shop-image{padding-top: 10px;
        .main-image{
            .title{font-size: 14px; color: #606266;}
            .content{margin-top: 8px; padding: @rem*40 @rem*60; border: 1px dashed #dcdfe6;}
        }
        .info-image{margin-top: @rem*40;
            .title{font-size: 14px; color: #606266;}
            .content{margin-top: 8px; padding: @rem*40 @rem*60; border: 1px dashed #dcdfe6;}
        }
        .el-button{width: @rem*296; margin-top: @rem*90;}
    }
    .mainImage{font-size: 14px; margin-bottom: 10px;}

</style>
