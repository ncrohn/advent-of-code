package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	file, err := os.ReadFile("input1.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	lines := strings.Split(string(file), "\n")
	col1 := make([]int, len(lines))
	col2 := make([]int, len(lines))

	distance := make([]int, len(lines))

	for i, line := range lines {
		lineVal := strings.Split(line, "   ")		
		col1[i], _ = strconv.Atoi(lineVal[0])
		col2[i], _ = strconv.Atoi(lineVal[1])
	}


	sort.Ints(col1)
	sort.Ints(col2)

	for i := 0; i < len(lines); i++ {
		distance[i] = int(math.Abs(float64(col1[i] - col2[i])))
	}

	fmt.Println(distance)
	fmt.Println(sum(distance))
}

func sum(arr []int) int {
	sum := 0
	for _, value := range arr {
		sum += value
	}
	return sum
}
