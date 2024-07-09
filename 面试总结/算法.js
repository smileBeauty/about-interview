// 冒泡排序（Bubble Sort） 
// 时间复杂度 O(n^2)
// 冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
function bubbleSort(arr) {  
    let n = arr.length;  
    let swapped;  
    do {  
        swapped = false;  
        for (let i = 1; i < n; i++) {  
            if (arr[i - 1] > arr[i]) {  
                // 交换元素  
                let temp = arr[i - 1];  
                arr[i - 1] = arr[i];  
                arr[i] = temp;  
                swapped = true;  
            }  
        }  
        // 减少n的值，因为每一轮处理后，最大的数会被放到最后  
        n -= 1;  
    } while (swapped);  
    return arr;  
}

// 选择排序（Selection Sort）
// 时间复杂度 O(n^2)
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
function selectionSort(arr) {  
    let n = arr.length;  
    for (let i = 0; i < n - 1; i++) {  
        let minIndex = i;  
        for (let j = i + 1; j < n; j++) {  
            if (arr[j] < arr[minIndex]) {  
                minIndex = j;  
            }  
        }  
        // 交换找到的最小元素与第i个位置的元素  
        let temp = arr[i];  
        arr[i] = arr[minIndex];  
        arr[minIndex] = temp;  
    }  
    return arr;  
}

// 插入排序（Insertion Sort）
// 时间复杂度 O(n^2) 适用于少量数据的排序
// 将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据。是稳定的排序方法。
function insertionSort(arr) {  
    let n = arr.length;  
    for (let i = 1; i < n; i++) {  
        let key = arr[i];  
        let j = i - 1;  
  
        /* 将arr[i]插入到arr[0]...arr[i-1]中已排好序的序列中 */  
        while (j >= 0 && arr[j] > key) {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
    }  
    return arr;  
}

// 快速排序（Quick Sort）
// 时间复杂度 O(n log n) O(n^2) 
// 采用分而治之的策略来把一个序列分为较小和较大的两个子序列，然后递归地排序两个子序列
function quickSort(arr, left = 0, right = arr.length - 1) {  
    if (left < right) {  
        const pivotIndex = partition(arr, left, right);  
  
        // Sort the left  
        quickSort(arr, left, pivotIndex - 1);  
  
        // Sort the right  
        quickSort(arr, pivotIndex + 1, right);  
    }  
    return arr;  
}  
  
function partition(arr, left, right) {  
    // 选择最右边的元素作为基准值  
    const pivot = arr[right];  
    let i = left - 1; // 较小元素的索引  
  
    for (let j = left; j < right; j++) {  
        // 如果当前元素小于或等于基准值  
        if (arr[j] <= pivot) {  
            i++; // 增加较小元素的索引  
  
            // 交换 arr[i] 和 arr[j]  
            [arr[i], arr[j]] = [arr[j], arr[i]];  
        }  
    }  
  
    // 交换 arr[i + 1] 和 arr[right]（或基准值）  
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];  
  
    return i + 1; // 返回基准值的最终位置  
}  
  
// 示例  
const myArray = [34, 7, 23, 32, 5, 62];  
console.log(quickSort(myArray));