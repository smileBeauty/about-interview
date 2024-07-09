// 冒泡排序 升序
function bubbleSort (arr) {
    let length = arr.length;
    let done;
    do {
        done = true;
        for (let index = 1; index < length; index++) {
            if (arr[index -1] > arr[index]) {
                let temp = arr[index -1];
                arr[index -1] = arr[index];
                arr[index] = temp;
                done = false;
            }
        }
        length--;
    } while (!done)
    return arr;
}

// 选择排序 升序
function selectionSort (arr) {
    let length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// 插入排序 升序
function insertionSort (arr) {
    let l = arr.length;
    for (let i = 1; i < l; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;  
        }
        arr[j + 1] = temp;
    }
    return arr;
}