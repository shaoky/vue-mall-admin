<template>
    <div class="shop-add mt20" ref="shopAdd" id="shopAdd">
        <div class="progress">
            <div class="item active">
                <i class="num">①</i>
                <span class="text">选择商品分类</span>
            </div>
            <div class="item" :class="progressVal > 1 ? 'active': ''">
                <i class="num">②</i>
                <span class="text">填写商品信息</span>
            </div>
            <div class="item" :class="progressVal > 2 ? 'active': ''">
                <i class="num">③</i>
                <span class="text">填写商品属性</span>
            </div>
        </div>

        <!-- 第一步-选择分类 -->
        <div class="shop-type" v-if="progressVal === 1">
            <div class="list">
                <div class="item" :class="{'active': showIndex === index}" v-for="(item, index) in classList" :key="item.goodsClassId" @click="goodsClassChange(item, index)">
                    <div class="text">{{item.goodsClassName}}</div>
                    <div class="icon" v-if="item.children.length > 0"><i class="el-icon-arrow-right"></i></div>
                </div>
            </div>
            <div class="list" v-if="classListVisible2 === true">
                <div class="item" :class="{'active': showIndex2 === index}" v-for="(item, index) in classList2" :key="item.goodsClassId" @click="goodsClassChange2(item, index)">
                    <div class="text">{{item.goodsClassName}}</div>
                    <!-- <div class="icon" v-if="item.children.length > 0"><i class="el-icon-arrow-right"></i></div> -->
                </div>
            </div>
            <div class="list" v-if="classListVisible3 === true">
                <div class="item" :class="{'active': showIndex3 === index}" v-for="(item,index) in classList3" :key="item.goodsClassId" @click="goodsClassChange3(item, index)">
                    <div class="text">{{item.goodsClassName}}</div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="class">你当前选中的商品类别是：
                <span v-if="goodsClassValue">{{goodsClassValue.goodsClassName}}</span>
                <span v-if="goodsClassValue2">>{{goodsClassValue2.goodsClassName}}</span>
                <span v-if="goodsClassValue3">>{{goodsClassValue3.goodsClassName}}</span>
            </div>
                <!-- <el-form :inline="true">
                    <el-form-item label="一级分类：">
                        <el-select v-model="goodsClassValue" @change="goodsClassChange" placeholder="请选择">
                            <el-option
                                v-for="item in classList"
                                :key="item.goodsClassId"
                                :label="item.goodsClassName"
                                :value="item.goodsClassId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类：" v-if="isGoodsClassTwo">
                        <el-select v-model="goodsClassTwoValue" @change="goodsClassChange" placeholder="请选择">
                            <el-option
                                v-for="item in goodsClassChildren"
                                :key="item.goodsClassId"
                                :label="item.goodsClassName"
                                :value="item.goodsClassId">
                                <span style="float: left">{{ item.goodsClassName }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form> -->
            <el-button type="primary" class="el-button-center" @click="onIsGoodsClass()">下一步，填写商品信息</el-button>
        </div>

        <!-- 第二步-填写商品信息 -->
        <div class="shop-attr" v-if="progressVal === 2">
            <!-- :model="shopAttrForm" class="demo-form-inline" -->
            <el-form label-width="120px" style="width: 700px;">
                <el-form-item label="商品分类：">
                    <span v-if="goodsClassValue">{{goodsClassValue.goodsClassName}}</span>
                    <span v-if="goodsClassValue2">>{{goodsClassValue2.goodsClassName}}</span>
                    <span v-if="goodsClassValue3">>{{goodsClassValue3.goodsClassName}}</span>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-input v-model="shopAttrForm.goodsName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品副标题：">
                    <el-input v-model="shopAttrForm.goodsSubtitle" placeholder="商品副标题"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌：">
                    <el-input v-model="brandName" :disabled="true" style="width: 200px;"></el-input>
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
                <!-- <el-form-item class="el-form-item-width">
                    <label>
                        <span class="required"></span>
                        <span class="title">商品品牌</span>
                        <span class="more">(填写商品最高品牌属性)</span>
                    </label>
                    <el-input v-model="shopAttrForm.goodsbrand"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-width">
                    <label>
                        <span class="required"></span>
                        <span class="title">商品系列</span>
                        <span class="more"></span>
                    </label>
                    <el-input v-model="shopAttrForm.goodsseries"></el-input>
                </el-form-item> -->

                <!-- 循环属性 -->

                <!-- <el-form-item class="el-form-item-width mt20" v-for="(item, index) in shopAttrList" :key="index">
                    <label>
                        <span class="title">{{item.attrName}}<span class="more" v-if="item.attrPrompt">({{item.attrPrompt}})</span></span>
                    </label>
                    <el-input v-model="item.value"></el-input>
                </el-form-item> -->
                <!-- 额外标题 -->
                <el-form-item label="平台价：" class="el-form-item-width">
                    <el-input v-model.number="shopAttrForm.shopPrice"></el-input>
                </el-form-item>
                <el-form-item label="市场价：" class="el-form-item-width">
                    <el-input v-model.number="shopAttrForm.marketPrice"></el-input>
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
                <el-form-item label="会员价格：" class="el-form-item-width">
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
                </el-form-item>

                <el-form-item label="排序：" class="el-form-item-width">
                    <el-input v-model.number="shopAttrForm.sort"></el-input>
                </el-form-item>
                <!-- <el-form-item class="el-form-item-width">
                    <label>
                        <span class="required">*</span>
                        <span class="title">包装规格<span class="more">(每件/箱瓶数)</span></span>
                    </label>
                    <el-input v-model.number="shopAttrForm.goodsAttrNumber"></el-input>
                </el-form-item>
                <el-form-item class="el-form-item-width">
                    <label>
                        <span class="required">*</span>
                        <span class="title">报价单位<span class="more">(商品设置价格时所对应的单位)</span></span>
                    </label>
                    <el-select v-model="shopAttrForm.goodsAttrUnit" placeholder="请选择"  class="el-form-item-width">
                        <el-option
                            v-for="item in unitList"
                            :key="item.label"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <br/> -->
                <el-form-item>
                    <el-checkbox v-model="shopAttrForm.isFreeShipping">包邮</el-checkbox>
                    <el-checkbox v-model="shopAttrForm.isMemberGoods" style="margin-left: 20px;">升级会员商品</el-checkbox>
                    <el-checkbox v-model="shopAttrForm.isHotGoods" style="margin-left: 20px;">热门商品</el-checkbox>
                    <el-checkbox v-model="shopAttrForm.isSeckillGoods" style="margin-left: 20px;">抢购商品</el-checkbox>
                </el-form-item>
            </el-form>
            <div class="next-btn">
                <el-button type="primary" class="" @click="progressVal = 1" style="">上一步，选择商品分类</el-button>
                <el-button type="primary" class="" @click="progressVal = 3">下一步，填写商品属性</el-button>
            </div>
        </div>

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

        <!-- 选择属性 -->
        <!-- <el-dialog title="选择属性" :visible.sync="attrVisible" width="500px" center>
            <el-checkbox-group v-model="attrValue">
                <el-checkbox :label="item.attrName" v-for="item in attrList" :key="item.attrId"></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="attrVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAttr">确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- 3、填写商品属性 -->
        <div class="shop-image" v-show="progressVal === 3">
            <el-tag>商品属性</el-tag><br/>
            <el-form label-width="120px" style="width: 700px;">
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
            <table class="v-table" style="margin-left: 70px;" v-if="goodsSkuList.length > 0">
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
            <!-- 商品缩略图 -->
            <h3 class="mainImage mt20">缩略图，普通商品推荐尺寸300*300，会员升级商品推荐尺寸697*340（商品列表展示使用）</h3>
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
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :onSuccess="uploadSuccess1"
                        :on-remove="handleRemove1">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
            <div class="next-btn">
                <el-button type="primary" class="" @click="progressVal = 2">上一步</el-button>
                <el-button type="primary" class="" @click="addShopAttr">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env'
import { getGoodsTypeList, addGoods, addShopImg, getGoodsTypeBasisInfo, getGoodsBrandList } from '@/api/getData'
import _ from 'lodash'

export default {
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            progressVal: 1, // 进度
            classListVisible: true,
            classListVisible2: false,
            classListVisible3: false,
            showIndex: null,
            showIndex2: null,
            showIndex3: null,
            classList: [],
            classList2: [],
            classList3: [],
            typeList: [],
            checkList: [],
            goodsClassValue: null,
            goodsClassValue2: null,
            goodsClassValue3: null,
            goodsClassTwoValue: '',
            isGoodsClassTwo: false,
            goodsClassChildren: [],
            isNext: false,
            isGoodsClass: false,

            // 第二步
            brandVisible: false,
            attrVisible: false,
            attrValue: [],
            isInputGoodsName: true,
            attrList: [],
            brandList: [
                {
                    brandId: 1,
                    brandName: '茅台'
                },
                {
                    brandId: 2,
                    brandName: '茅台1'
                }
            ],
            brandName: '',
            // shopAttrList: [],
            unitList: [{
                value: 1,
                label: '瓶'
            }, {
                value: 2,
                label: '箱'
            }],

            // shopAttr: {},

            shopAttrForm: {
                goodsBrandId: null,
                goodsMinimum: 1,
                goodsMaximun: 999,
                isMemberPrice: false,
                goodsImage: '',
                goodsCover: '',
                isFreeShipping: false,
                isMemberGoods: false,
                isHotGoods: false,
                isOpenSeries: false,
                sort: 100,
                saleCount: 0,
                goodsBannerList: [],
                goodsDetailList: []
            },

            // 第三步
            // headers: {
            //     authorization: 'p98gfj1'
            // },
            goodsSpecList: [],
            goodsAttrList: [],
            goodsSkuList: [],
            goodsSkuList1: [],
            specList: [], // 规格
            goodsthumb: '',
            shopImgForm: {
                no: '', // 第二步确认后，得到的no
                imgurl: '',
                type: 1, // 1添加，2修改
                types: 1, // 1主图，2详情图
                imgid: 0
            },

            dialogImageUrl: '',
            dialogVisible: false,
            goodsSku: {
                attrName: '',
                specName1: '',
                specName: '',
                delAttr: [],
                specList: [],
                delSpec: []
            },
            goodsSkuAttrVisible: false,
            goodsSkuSpecVisible: false,
            delGoodsSkuAttrVisible: false,
            delGoodsSkuSpecVisible: false
        }
    },
    mounted () {
        this.getGoodsTypeList()
        // this.getGoodsAttr()
    },
    methods: {

        /**
         * 1、选择分类
         */
        // async getGoodsAttr () {
        //     let goodsClassId
        //     if (this.isGoodsClassTwo) {
        //         goodsClassId = parseInt(this.goodsClassTwoValue)
        //     } else {
        //         goodsClassId = parseInt(this.goodsClassValue)
        //     }
        //     let res = await getGoodsAttr({goodsClassId: goodsClassId, isSelectSuperior: 1})
        //     this.attrList = res.data.list
        //     let shopAttrList = []
        //     this.attrList.forEach((item) => {
        //         shopAttrList.push({
        //             'attrPrompt': item.attrPrompt,
        //             'value': item.value,
        //             'attrName': item.attrName
        //         })
        //     })
        //     this.shopAttrList = shopAttrList
        // },
        // 获取分类
        async getGoodsTypeList () {
            let res = await getGoodsTypeList({isOpen: 1, type: 2})
            this.classList = res.data.list
        },

        // 监听分类变化
        goodsClassChange (item, index) {
            console.log(item.children)
            this.showIndex = index
            this.showIndex2 = null
            this.showIndex3 = null
            this.goodsClassValue = item
            this.goodsClassValue2 = null
            this.goodsClassValue3 = null
            if (item.children.length > 0) {
                this.classList2 = item.children
                this.classListVisible2 = true
            } else {
                this.classListVisible2 = false
                this.shopAttrForm.goodsClassId = item.goodsClassId
            }

            // for (let item of this.classList) {
            //     if (item.goodsClassId === id) {
            //         if (item.children.length > 0) {
            //             this.goodsClassChildren = item.children
            //             this.isGoodsClassTwo = true
            //         } else {
            //             this.isGoodsClassTwo = false
            //         }
            //     }
            // }
            // this.shopAttrForm.goodsClassId = id
            // this.isGoodsClass = true
        },
        goodsClassChange2 (item, index) {
            this.showIndex2 = index
            this.showIndex3 = null
            this.goodsClassValue2 = item
            this.goodsClassValue3 = null
            if (item.children.length > 0) {
                this.classList3 = item.children
                this.classListVisible3 = true
            } else {
                this.classListVisible3 = false
                this.shopAttrForm.goodsClassId = item.goodsClassId
            }
        },
        goodsClassChange3 (item, index) {
            this.showIndex3 = index
            this.goodsClassValue3 = item
            this.shopAttrForm.goodsClassId = item.goodsClassId
        },
        onIsGoodsClass () {
            if (this.classListVisible && !this.goodsClassValue) {
                this.$notify({
                    title: '错误',
                    message: '请选择分类',
                    type: 'error'
                })
                return
            }
            if (this.classListVisible2 && !this.goodsClassValue2) {
                this.$notify({
                    title: '错误',
                    message: '请选择分类',
                    type: 'error'
                })
                return
            }
            if (this.classListVisible3 && !this.goodsClassValue3) {
                this.$notify({
                    title: '错误',
                    message: '请选择分类',
                    type: 'error'
                })
                return
            }

            // this.getGoodsAttr()
            this.progressVal = 2
            this.getGoodsBrandList()
            this.getGoodsTypeBasisInfo()
            // if (this.isGoodsClass === true) {
            //     this.getGoodsAttr()
            //     this.progressVal = 2
            // } else {
            //     this.$notify({
            //         title: '错误',
            //         message: '请选择分类',
            //         type: 'error'
            //     })
            // }
        },

        async getGoodsBrandList () {
            let res = await getGoodsBrandList()
            this.brandList = res.data.list
        },

        // onAttr () {
        //     let shopAttrList = []
        //     this.attrValue.forEach((item) => {
        //         let row = {}
        //         if (this.shopAttrList.length > 0) {
        //             let index = _.findIndex(this.shopAttrList, {'attrName': item})
        //             console.log(index)
        //             if (index === -1) {
        //                 row = {
        //                     'attrName': item
        //                 }
        //             }
        //         } else {
        //             row = {
        //                 'attrName': item
        //             }
        //         }
        //         if (row.attrName) {
        //             shopAttrList.push(row)
        //         }
        //     })

        //     this.shopAttrList = [...this.shopAttrList, ...shopAttrList]

        //     this.shopAttrList.forEach((item) => {
        //         // 获取提示信息
        //         for (let item1 of this.attrList) {
        //             if (item.attrName === item1.attrName) {
        //                 item.attrPrompt = item1.attrPrompt
        //             }
        //         }
        //         let index = _.indexOf(this.attrValue, item.attrName)
        //         console.log(index)
        //         if (index === -1) {
        //             _.pullAllWith(this.shopAttrList, [{attrName: item.attrName, value: item.value, attrPrompt: item.attrPrompt}], _.isEqual)
        //         }
        //     })
        //     this.attrVisible = false
        // },

        /**
         * 2、商品信息
         */

        onSelectBrand () {
            this.brandVisible = false
        },
        brandHandleCurrentChange (item) {
            this.brandName = item.brandName
            this.shopAttrForm.goodsBrandId = item.brandId
        },

        onTypeItemChange (value) {
            this.classList.forEach(item => {
                if (item.goodsclassname === value[1]) {
                    item.selected = true
                } else {
                    item.selected = false
                }
            })
            this.checkList = []
            this.checkList.push(value[1])
        },
        onTypeItem (row) {
            this.classList.forEach(item => {
                item.selected = false
            })
            row.selected = true
            this.checkList = []
            this.checkList.push(row.goodsclassname)
        },

        /**
         * 第三步
         */
        async getGoodsTypeBasisInfo () {
            let res = await getGoodsTypeBasisInfo({goodsClassId: this.shopAttrForm.goodsClassId})
            // let res = await getGoodsTypeBasisInfo({goodsClassId: 42})
            this.goodsSpecList = res.data.goodsSpec
            this.goodsAttrList = res.data.goodsAttr
        },
        // 主图
        handleGoodsthumbSuccess (res, file) {
            this.shopAttrForm.goodsImage = res.data.url
            // this.addImage()
        },
        handleGoodsCoverSuccess (res, file) {
            this.shopAttrForm.goodsCover = res.data.url
            // this.addImage()
        },

        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        // 轮播图
        uploadSuccess (response, file, fileList) {
            console.log(response, file, fileList)
            this.shopAttrForm.goodsBannerList.push(response.data.url)
            // this.shopImgForm.type = 1
            // this.shopImgForm.types = 1
            // this.addImage()
        },
        handleRemove (file, fileList) {
            _.pull(this.shopAttrForm.goodsBannerList, file.response.data.url)
        },
        // 详情图
        uploadSuccess1 (response, file, fileList) {
            this.shopAttrForm.goodsDetailList.push(response.data.url)
            // console.log(response, file, fileList)
            // this.shopImgForm.imgurl = response.data.url
            // this.shopImgForm.type = 1
            // this.shopImgForm.types = 2
            // this.addImage()
        },
        handleRemove1 (file, fileList) {
            _.pull(this.shopAttrForm.goodsDetailList, file.response.data.url)
        },
        async addImage () {
            let res = await addShopImg(this.shopImgForm)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.message,
                    type: 'success'
                })
            }
        },
        goShopInfo () {
            this.$confirm('商品已成功添加到你的商品库', '添加成功', {
                confirmButtonText: '设置销售区域',
                cancelButtonText: '继续添加',
                // type: 'warning',
                center: true
            }).then(() => {
                this.$router.push({name: 'shopPriceAdd', params: {no: this.shopImgForm.no}})
            }).catch(() => {
                this.$router.push({path: '/shop/shop-add'})
            })
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
        onSpec (item, value) {
            let goodsSkuList = []
            let goodsSkuList1 = []
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

                let sku1 = {
                    text: text1,
                    shopPrice: 0,
                    goodsStock: 0,
                    goodsStockWarn: 10,
                    memberPrice: 0
                }

                goodsSkuList.push(sku)
                goodsSkuList1.push(sku1)
            }

            this.goodsSkuList = goodsSkuList
            this.goodsSkuList1 = goodsSkuList1
        },
        // 最终提交
        async addShopAttr () {
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
                let res = await addGoods(form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.$router.push({path: '/business/goods/index'})
                }
            } catch (err) {}
        }
    },
    watch: {
        progressVal (val) {
            const box = document.getElementById('mainBody')
            box.scrollTop = 0
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/define.less";
    td{vertical-align: middle;}
    /*定义*/
    .el-form-item-width{width: 360px;}
    .next-btn{display: flex; width: @rem*700; margin: 0 auto; margin-top: @rem*60;
        .el-button{flex: 1; margin: 0 @rem*50;}
    }

    /*进度条*/
    .progress{display: flex; align-items: center; height: 44px; line-height: 44px; background: #ebeef5;
        .item{flex: 1; text-align: center; font-size: 16px;color: #909399;
            .num{font-size: 18px;}
            .text{margin-left: 10px;}
            &.active{background: #007cfc; color: #fff;}
        }
    }

    /*选择分类*/
    .shop-type{padding: @rem*51 0 0 0; width: @rem*1220; margin: 0 auto;
        .list{width: @rem*300; height: @rem*500; border: 1px solid #333; float: left; margin: 0 @rem*40;
            .item{cursor: pointer; display: flex; height: @rem*40; align-items: center; padding: 0 @rem*30;
                .text{flex: 1;}
                .icon{}
                &:hover{background: #007cfc; color: #fff;}
                &.active{background: #007cfc; color: #fff;}
            }
        }
        .class{margin-top: @rem*15; margin-left: @rem*40;}
        // .el-button{width: @rem*396; margin-top: @rem*60;}
    }

    /*商品属性*/
    .shop-attr{padding: @rem*60 0 @rem*62 0;
        .title{
            .more{color: #037efd;}
        }
        // .el-form{padding-left: @rem*170;}
        // .el-button{min-width: @rem*296; margin-top: @rem*50;}
    }

    /*商品图片*/
    .shop-image{padding: @rem*68 @rem*125 @rem*64 0;
        .main-image{
            .title{font-size: 14px; color: #606266;}
            .content{margin-top: 8px; padding: @rem*40 @rem*60; border: 1px dashed #dcdfe6;}
        }
        .info-image{margin-top: @rem*40;
            .title{font-size: 14px; color: #606266;}
            .content{margin-top: 8px; padding: @rem*40 @rem*60; border: 1px dashed #dcdfe6;}
        }
        // .el-button{width: @rem*296; margin-top: @rem*90;}
    }

    .mainImage{font-size: 14px; margin-bottom: 10px;}
</style>
<style lang="less">
    .shop-add{
        .el-form--label-top .el-form-item__label{padding: 0!important;}
    }
</style>
