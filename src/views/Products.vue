<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal(true)">增加產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>

  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>

  <DelModal ref="delModal" :item="tempProduct" @del-item="delProduct"></DelModal>

  <Loading :active="isLoading"></Loading>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import ProductModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ['httpMessageState'],
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        console.log('admin/products/', this.products);
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {
          imagesUrl: [''],
        };
      } else {
        this.tempProduct = {
          ...item,
          imagesUrl: item.imagesUrl || [''],
        };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.isLoading = true;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        this.isLoading = false;
        console.log(response);
        productComponent.hideModal();
        this.httpMessageState(response, `產品${this.isNew ? '新增' : '編輯'}`);
      });
      this.getProducts();
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.isLoading = false;
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.httpMessageState(response, '刪除產品');
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
