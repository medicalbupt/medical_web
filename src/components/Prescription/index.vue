<template>
    <div class="prescription-body">
        <el-button size="mini" type="primary" @click="addLine()">增加</el-button>
        <el-row style="margin-top: 8px;">
            <el-col v-for="(item, index) in myValue" :key="index" :span="6">
                <div class="one-line">
                    <el-input :ref="'input_' + index" v-model="item.name" class="name" placeholder="药名" @change="change" @keyup.enter.native="addLine(index)"></el-input>
                    <el-input v-model="item.value" class="value" placeholder="用量" @change="change" @keyup.enter.native="addLine(index)">
                        <template slot="append">g</template>
                    </el-input>
                    <i v-if="myValue.length > 1" class="icon el-icon-error" @click="remove(index)"></i>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'Prescription',
    props: {
        value: Array
    },
    data() {
        return {
            myValue: [{
                name: '',
                value: ''
            }],
        };
    },
    watch: {
        value(newVal) {
            this.myValue = newVal || [{
                name: '',
                value: ''
            }];
        }
    },
    methods: {
        addLine(index) {
            if (index === undefined) {
                this.myValue.push({
                    name: '',
                    value: ''
                });
            } else {
                this.myValue.splice(index + 1, 0, {
                    name: '',
                    value: ''
                });

                this.$nextTick(() => {
                    this.$refs[`input_${index + 1}`][0].focus();
                });
            }
        },
        remove(index) {
            this.myValue.splice(index, 1);
        },
        change() {
            this.$emit('input', this.myValue);
        }
    }
}
</script>

<style lang="scss" scoped>
.one-line {
    display: flex;
    margin-bottom: 8px;
    vertical-align: middle;
    margin-right: 8px;

    .value {
        margin-left: -1px;
        border: 0px;
    }

    .icon {
        flex: 0;
        display: inline-block;
        margin-left: 4px;
        cursor: pointer;
        color: #bbb;
        font-size: 18px;
        margin-top: 6px;
    }
}
</style>
  