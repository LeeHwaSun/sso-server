<template>
  <q-page padding>
    <div class="row items-center q-gutter-x-md">
      <div class="text-h5">허용 사이트</div>
      <q-space></q-space>
      <q-btn icon="mdi-plus" round color="primary" @click="openForm()">
        <MyToolTip dir="left">사이트 추가</MyToolTip>
      </q-btn>
    </div>
    <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :rows="rows"
      row-key="id"
      @request="fetchData"
      class="q-mt-md">
      <template #bottom>
        <TableFooter :pagination="pagination" @request="fetchData"></TableFooter>
      </template>
      <template #body-cell-CMD="props">
        <q-td :props="props">
          <q-btn icon="mdi-pencil" dense round flat color="secondary" @click="openForm(props.row)">
            <MyToolTip>수정</MyToolTip>
          </q-btn>
          <q-btn icon="mdi-delete" dense round flat color="negative" @click="removeItem(props.row)">
            <MyToolTip>삭제</MyToolTip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <AllowSiteFormDialog ref="form" :item="curItem" @saved="changePagination"></AllowSiteFormDialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import allowSiteApi from 'src/apis/allowSiteApi';
import TablePageMixin from "src/mixins/TablePageMixin.vue"
import TableFooter from "src/components/etc/TableFooter.vue"
import MyToolTip from 'src/components/etc/MyToolTip.vue';
import AllowSiteFormDialog from 'components/admin/AllowSiteFormDialog.vue';

export default defineComponent({
  components: { TableFooter, MyToolTip, AllowSiteFormDialog },
  name: "AllowSite",
  mixins: [ TablePageMixin ],
  data() {
    return {
      pagination: null,
      rows: [],
      curItem: null
    }
  },
  computed : {
    columns() {
      const arr = [...allowSiteApi.columns];
      arr.push({ name : "CMD" });
      return arr;
    },
    defaultPagination: () => allowSiteApi.defaultPagination,
    fetchApi: () => allowSiteApi.list,
  },
  methods: {
    openForm(item) {
      this.curItem = item;
      this.$nextTick( () => {
        this.$refs.form.show();
      })
    },
    async removeItem(item) {
      this.$q.dialog({
        label: "삭제",
        message: `${item.appName} 삭제 하시겠습니까?`,
        cancel: true,
      }).onOk( async () => {
        this.$q.loading.show();
        const data = await allowSiteApi.remove(item.id);
        this.$q.loading.hide();
        if (data) {
          this.changePagination();
          this.$q.notify( { type: 'info', message: `${item.appName} 삭제 되었습니다.` } );
        }
      });
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
