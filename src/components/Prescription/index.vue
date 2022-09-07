<template>
    <div class="prescription-body">
        <el-button size="mini" type="primary" @click="addLine()">增加</el-button>
        <el-row style="margin-top: 8px;">
            <el-col v-for="(item, index) in myValue" :key="index" :span="6">
                <div class="one-line">
                    <el-input :ref="'input_name_' + index" v-model="item.name" class="name" placeholder="药名" @change="change" 
                        @keyup.enter.native="addLine(index)" 
                        @keyup.left.native="changeFocus(index, 'left', 'value')" 
                        @keyup.right.native="changeFocus(index, 'right', 'value')" 
                        @keyup.up.native="changeFocus(index, 'up', 'name')" 
                        @keyup.down.native="changeFocus(index, 'down', 'name')"></el-input>
                    <el-input :ref="'input_value_' + index" v-model="item.value" class="value" placeholder="量(g)" @change="change"
                        @keyup.enter.native="addLine(index)"
                        @keyup.left.native="changeFocus(index, 'left', 'name')" 
                        @keyup.right.native="changeFocus(index, 'right', 'name')" 
                        @keyup.up.native="changeFocus(index, 'up', 'value')" 
                        @keyup.down.native="changeFocus(index, 'down', 'value')"></el-input>
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
                    this.$refs[`input_name_${index + 1}`][0].focus();
                });
            }
        },
        remove(index) {
            this.myValue.splice(index, 1);
        },
        change() {
            this.$emit('input', this.myValue);
        },
        changeFocus(index, direction, target) {
            // left
            if(direction === 'left' && !(index === 0 && target === 'value')) {
                this.$refs[`input_${target}_${Math.max(0, target === 'value' ? (index - 1) : index)}`][0].focus();
            } else if(direction === 'right' && !(index === this.myValue.length - 1 && target === 'name')) {
                this.$refs[`input_${target}_${Math.min(this.myValue.length - 1, target === 'name' ? index + 1 : index)}`][0].focus();
            } else if(direction === 'up') {
                this.$refs[`input_${target}_${Math.max(0, index - 4)}`][0].focus();
            } else if(direction === 'down') {
                this.$refs[`input_${target}_${Math.min(this.myValue.length - 1, index + 4)}`][0].focus();
            }
        }
    }
}
</script>

<style lang="scss">
.prescription-body {
    .one-line {
        display: flex;
        margin-bottom: 8px;
        vertical-align: middle;
        margin-right: 8px;

        .name, .value {
            .el-input__inner {
                border-radius: 0 !important;
            }
        }

        .name {
            max-width: 150px;
        }

        .value {
            max-width: 70px;
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
}
</style>
  