<template>
  <header id="header">
    <h1>UIT Schedule</h1>
    <p>Tool giúp bạn dễ dàng sắp xếp thời khóa biểu cho việc ĐKHP ở trường</p>
    <input class="text-white" @change="inputChangeHandler" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
  </header>
</template>

<style scoped src="@/styles/Once/TheHeader.css"></style>

<script>
import XLSX from "xlsx";
import {convertData} from '../../services'

export default {
    
	name: "TheHeader",
	methods: {
        inputChangeHandler (e) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (result) {
                    const excel = XLSX.read(result, {type: "binary"});
                    const lithuyet = excel.Sheets[excel.SheetNames[0]];
                    const thuchanh = excel.Sheets[excel.SheetNames[1]];
                    const dataLithuyet = XLSX.utils.sheet_to_json(lithuyet, {header: 1});
                    const dataThuchanh = XLSX.utils.sheet_to_json(thuchanh, {header: 1});

                    const jsonLithuyet = convertData(dataLithuyet);
                    const jsonThucHanh = convertData(dataThuchanh);
                    const classes = {
                        'TKB LT':jsonLithuyet,
                        'TKB TH':jsonThucHanh,
                    }
                    alert('Đã tải thời khóa biểu lên')
                    this.$store.commit("setClasses", classes);
                }
            };
            const file = e.target.files[0];
            if (file) {
                reader.readAsBinaryString(file);
            }
        }
	},
};
</script>