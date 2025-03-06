<script setup lang="ts">
  import {Doughnut} from 'vue-chartjs';
  import {Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions} from 'chart.js';
  import annotationPlugin, {type AnnotationOptions} from 'chartjs-plugin-annotation';
  import {ref} from 'vue';

  ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin);
  interface Props {
    nutritionInfo: string;
    inputData: number;
  }
  const props = defineProps<Props>();

  const rid = (nutrition: string): number => {
    if (nutrition === 'sodium') {
      return 2000;
    } else if (nutrition === 'fat') {
      return 54;
    } else if (nutrition === 'calories') {
      return 2000;
    } else if (nutrition === 'carbohydrates') {
      return 324;
    } else if (nutrition === 'protein') {
      return 55;
    }
    return 0;
  };

  const color = (nutrition: string) => {
    if (nutrition === 'sodium') {
      return '#03d8b1';
    } else if (nutrition === 'fat') {
      return '#f25267';
    } else if (nutrition === 'calories') {
      return '#f89a00';
    } else if (nutrition === 'carbohydrates') {
      return '#b05bff';
    } else if (nutrition === 'protein') {
      return '#00bdec';
    }
  };

  const label = (nutrition: string) => {
    if (nutrition === 'sodium') {
      return '나트륨(mg)';
    } else if (nutrition === 'fat') {
      return '지방(g)';
    } else if (nutrition === 'calories') {
      return '열량(kcal)';
    } else if (nutrition === 'carbohydrates') {
      return '탄수화물(g)';
    } else if (nutrition === 'protein') {
      return '단백질(g)';
    }
  };

  // ✅ vue3 version
  // 차트 데이터
  const chartData = ref({
    labels: [props.nutritionInfo],
    datasets: [
      {
        // // 범례
        // label: 'Dataset 1',
        // 그래프 색상
        backgroundColor: [color(props.nutritionInfo), '#E7E5E4'],
        // 데이터
        data: [props.inputData, rid(props.nutritionInfo) - props.inputData],
      },
    ],
  });

  // 차트 옵션
  const chartOptions = ref<
    ChartOptions<'doughnut'> & {
      plugins: {annotation?: {annotations: Record<string, AnnotationOptions>}};
    }
  >({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      // 범례 위치
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          font: {size: 12},
        },
      },
      // 제목 설정
      title: {
        display: false,
        text: 'Doughnut Chart',
        font: {size: 20},
        padding: {bottom: 20},
      },
      annotation: {
        annotations: {
          dLabel: {
            type: 'doughnutLabel' as any,
            content: label(props.nutritionInfo),
            font: {size: 16},
            color: '#292524',
          },
        },
      },
    },
  });
</script>

<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
