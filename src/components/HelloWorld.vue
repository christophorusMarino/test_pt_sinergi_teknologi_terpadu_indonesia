<template>
  <v-container fluid>
    <v-card class="mx-15">
      <v-card-title class="justify-center font-weight-bold">
        SIMPLE CRUD WITH VUEX
      </v-card-title>
      <v-divider class="mx-15"></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col>
              <v-text-field
                label="Nama Item"
                v-model="newItem.nama"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Merk"
                v-model="newItem.merk"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Qty"
                v-model="newItem.qty"
                :rules="[rules.required]"
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Harga"
                v-model="newItem.harga"
                :rules="[rules.required]"
                @keypress="isNumber($event)"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="error" icon :disabled="!valid" @click.prevent="add">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-text class="mt-5">
        <v-table>
          <thead>
            <tr>
              <th class="text-subtitle-1 font-weight-bold black--text">No.</th>
              <th class="text-subtitle-1 font-weight-bold black--text">
                Nama Item
              </th>
              <th class="text-subtitle-1 font-weight-bold black--text">Merk</th>
              <th class="text-subtitle-1 font-weight-bold black--text">Qty</th>
              <th class="text-subtitle-1 font-weight-bold black--text">
                Harga Satuan
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataItem" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.merk }}</td>
              <td>{{ item.qty }}</td>
              <td>Rp. {{ moneyFormat(item.harga) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "HelloWorld",

  data: () => ({
    valid: false,
    loading: false,
    newItem: {
      nama: "",
      merk: "",
      qty: "",
      harga: "",
    },
    rules: {
      required: (value) => !!value || "",
    },
  }),

  computed: {
    ...mapGetters({
      dataItem: "addItem/listItem",
    }),
  },

  methods: {
    ...mapMutations({
      additem: "addItem/insertItem",
    }),

    add() {
      this.additem(this.newItem);
      this.newItem = {
        nama: "",
        merk: "",
        qty: "",
        harga: "",
      };
    },

    moneyFormat(val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
