<template>
	<div class="wrap">
		111
		<v-footer></v-footer>
	</div>
</template>

<script>
import vFooter from '../../components/footer'

export default {
    data () {
        return {
        }
    },
    mounted () {
    },
    methods: {
    },
    components: {
        vFooter
    }
}
</script>

<style lang="less">
	@import '../../assets/less/define.less';
	.wrap{padding-bottom: 80px;}
	.grid{background: #fff;}
	image[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
	}
	.goodslist{
		.goodslist-box{
			li{float: left;width: 49.1%;overflow: hidden;margin-right: 5px;margin-bottom: 5px;background: #fff;
				.item-img{display: block;
					img{display: block;margin: 0 auto;}
				}
				.item-info{padding: @rem*20;display: block;
					.item-title{height: 30px;overflow: hidden;line-height: 15px;}
					.item-price{display: block; color: #f23030;padding: @rem*20 0; font-size: 14px;}
				}
				&:nth-child(2n){margin-right: 0;}
			}
			&:after{.clear;}
		}
		/*另外一种写法，2个2个一组，不好调用，就换了一种 ^.^ */
		/*ul{display: flex;
			li{flex: 1;width: 0;margin-right: 3px;margin-bottom: 3px; background: #fff;padding-bottom: @rem*5;
				.item-img{display: block;
					img{display: block;margin: 0 auto;}
				}
				.item-info{padding: @rem*10;display: block;
					.item-title{height: 30px;overflow: hidden;line-height: 15px;}
					.item-price{color: #f23030;}
				}
				&:nth-child(2n){margin-right: 0;}
			}
		}*/
	}
</style>
