class MatrixCalculator {
	constructor() {
		this.matrixA = [];
		this.matrixB = [];
		for (var i = 0; i < 3; i++) {
			this.matrixA[i] = [];
			this.matrixB[i] = [];
		}

		this.AxDimension = 3;
		this.AyDimension = 3;
		this.BxDimension = 3;
		this.ByDimension = 3;
	}

	invertMatrix() {

		this.cleanBoard();
		this.calculateDeterminant();

		if (this.determinantA == null)
			return; //Error will already be printed out by calculateDeterminant method.

		if (this.determinantA == 0) {
			this.printOnConsole("Matriz es no invertible.");
			return;
		}

		var result = [];

		for (var i = 0; i < 3; i++) {
			result[i] = [];
		}

		this.adjunctMatrix();

		//Dividing the cofactor matrix transposted by the determinant

		if (this.AxDimension != 1) {
			var steps = [];
			var step1 = [];
			var fraction = [];
			var gcf = [];
			var aux = [];
			var sim = [];

			for (var i = 0; i < this.AxDimension; i++) {
				steps[i] = [];
				step1[i] = [];
				gcf[i] = [];
				aux[i] = [];
				sim[i] = [];
				fraction[i] = [];

				for (var j = 0; j < this.AyDimension; j++) {
					result[i][j] = Math.round(this.adjunctA[i][j] / this.determinantA * 100) / 100;
					step1[i][j] = `${this.adjunctA[i][j]} / ${this.determinantA}`;
					gcf[i][j] = this.gcm(this.adjunctA[i][j], this.determinantA);

					if (gcf[i][j] == 0) {
						fraction[i][j] = 0;
					} else {
						//denominator for fraction
						aux[i][j] = `${gcf[i][j]}`;
						//fraction
						sim[i][j] = `${this.adjunctA[i][j]} ÷ ${gcf[i][j]} / ${this.determinantA} ÷ ${gcf[i][j]}`;
						fraction[i][j] = `${this.adjunctA[i][j] / gcf[i][j]} / ${this.determinantA / gcf[i][j]}`;
					}

					steps[i][j] = `adj(A)[${i + 1}][${j + 1}] / det(A) = ${this.adjunctA[i][j]} / ${this.determinantA}  ->   A^-1[${i + 1}][${j + 1}] = ${step1[i][j]}`;
				}
			}
		}

		var string = "Realizando cálculo de inversa de la matrix:\r";
		string += "\tA^-1 = adj(A)/det(A):\r";
		string += "\r";
		string += "Procedimiento analítico de la matriz inversa:\r";

		string += "\tDividiendo la matriz de cofactores de A entre la determinante de A...\r";

		for (var i = 0; i < this.AyDimension; i++) {
			for (var j = 0; j < this.AxDimension; j++) {
				string += "\t" + steps[i][j] + "\r";
			}
		}
		string += "\r";

		string += "Invirtiendo la matriz:\r";
		string += "=" + this.matrixToString(step1) + "\r";
		string += "MCD(numerador,denominador):\r";
		string += "=" + this.matrixToString(aux) + "\r";
		string += "Simplificando matriz:\r";
		string += "=" + this.matrixToString(sim) + "\r";
		string += "Matriz inversa en fracción:\r";
		string += "=" + this.matrixToString(fraction) + "\r";
		string += "Matriz inversa en decimales:\r";
		string += "=" + this.matrixToString(result);

		this.printOnConsole(string);

	}

	gcm(a, b) {
		if (b == 0) {
			return a;
		} else {
			return this.gcm(b, a % b);
		}
	}

	adjunctMatrix() {

		this.cleanBoard();
		this.rebuildMatrix();
		var adjacent = [];
		var result = [];
		var aux = [];

		for (var i = 0; i < 3; i++) {
			adjacent[i] = [];
			result[i] = [];
			aux[i] = [];
		}

		//Calculating adjacency matrix
		var step1 = [];
		var stepi = [];

		for (i = 0; i < this.AyDimension; i++) {

			step1[i] = [];
			stepi[i] = [];

			for (var j = 0; j < this.AxDimension; j++) {

				var p = (-1) ** (i + 1 + j + 1);
				var p = p == 1 ? " " + p : p;

				if (this.AxDimension == 1 && this.AyDimension == 1) {
					adjacent[i][j] = 1 + "/" + this.matrixA[i][j];

				} else if (this.AxDimension == 2 && this.AyDimension == 2) {
					//Reconstructing 2 dimension sub matrix
					adjacent[j][i] = p * this.matrixA[i][j];
					aux[i][j] = adjacent[0][0];
					adjacent[0][0] = adjacent[1][1];
					adjacent[1][1] = aux[0][0];

					if (i == 0) {
						if (j == 0) {
							step1[i][j] = `C[${i + 1}][${j + 1}] = (-1^(${i + 1}+${j + 1})) * M${i + 1}${j + 1} = ${p} * ${this.matrixA[1][1]} = ${this.matrixA[1][1]}`;
							stepi[i][j] = `${p} * ${this.matrixA[1][1]}`;
						} if (j == 1) {
							step1[i][j] = `C[${i + 1}][${j + 1}] = (-1^(${i + 1}+${j + 1})) * M${i + 1}${j + 1} = ${p} * ${-this.matrixA[1][0]} = ${-this.matrixA[1][0]}`;
							stepi[i][j] = `${p} * ${-this.matrixA[1][0]}`;
						}
					} else {
						step1[i][j] = `C[${i + 1}][${j + 1}] = (-1^(${i + 1}+${j + 1})) * M${i + 1}${j + 1} = ${p} * ${adjacent[i][j]} = ${adjacent[i][j]}`;
						stepi[i][j] = `${p} * ${adjacent[i][j]}`;
					}

				} else if (this.AxDimension == 3 && this.AyDimension == 3) {  //Calculando cofactor matrix
					//Reconstructing 2 dimension sub matrix
					var count1 = 0;
					var count2 = 0;
					for (var k = 0; k < 3; k++) {
						for (var l = 0; l < 3; l++) {
							if (l != j && k != i) {
								aux[count1][count2] = this.matrixA[k][l];
								count2++;
							}
						}
						count2 = 0;
						if (k != i)
							count1++;
					}
					adjacent[i][j] = p * (aux[0][0] * aux[1][1] - aux[0][1] * aux[1][0]);
					step1[i][j] = `C[${i + 1}][${j + 1}] = [-1^(${i + 1}+${j + 1})] * det(M${i + 1}${j + 1}) = ${p} * [(${aux[0][0]} * ${aux[1][1]}) - (${aux[0][1]} * ${aux[1][0]})] = ${adjacent[i][j]} `;
					//stepi[i][j] = `${(-1) ** (i + 1 + j + 1)} * [(${aux[0][0]} * ${aux[1][1]}) - (${aux[0][1]} * ${aux[1][0]})]`;
					stepi[i][j] = `${p} * [(${aux[0][0]} * ${aux[1][1]}) - (${aux[0][1]} * ${aux[1][0]})]`;
				} else {
					this.printOnConsole("Solo se pueden adjuntar matrices cuadradas.");
					return;
				}
			}
		}

		//Transposing the cofactor matrix
		var adjunct = [];
		var step2 = [];
		for (var i = 0; i < this.AxDimension; i++) {
			adjunct[i] = [];
			step2[i] = [];
			for (var j = 0; j < this.AyDimension; j++) {
				result[i][j] = adjacent[j][i];
				adjunct[i][j] = result[i][j];
				var e = adjacent[j][i];
				var a = e >= 0 ? " " + e : e;
				step2[i][j] = `C[${j + 1}][${i + 1}] = ${a}   ->   C^t[${j + 1}][${i + 1}] = adj(A)[${i + 1}][${j + 1}] = ${a}`;
			}
		}

		this.adjunctA = adjunct;

		var string = "Realizando cálculo de la matriz adjunta:\r";
		string += "\tadj(A) = cof(A)^t = C^t:\r";
		string += "\r";
		string += "Procedimiento analítico de la matriz adjunta:\r";
		string += "Hallando elementos de la matriz de cofactores de A...\r";
		string += "\tC[i][j] = [-1^(i+j)] * det(Mij):\r" + "\r";

		for (var i = 0; i < this.AyDimension; i++) {
			for (var j = 0; j < this.AxDimension; j++) {
				string += "\t" + step1[i][j] + "\r";
			}
		}
		string += "\r";

		string += "Construyendo la matriz de cofactores de A con sus elementos...\r";

		string += "C =" + this.matrixToString(stepi) + "\r";
		string += "C =" + this.matrixToString(adjacent) + "\r";

		string += "Transponiendo la matriz de cofactores de A...\r";

		for (var i = 0; i < this.AyDimension; i++) {
			for (var j = 0; j < this.AxDimension; j++) {
				string += "\t" + step2[i][j] + "\r";
			}
		}
		string += "\r";

		string += "Adjuntando la matriz:\r";
		string += "=" + this.matrixToString(result);

		this.printOnConsole(string);

	}

	transposeMatrix() {

		this.cleanBoard();
		this.rebuildMatrix();
		var result = [];
		var steps = [];

		for (var i = 0; i < this.AyDimension; i++) {
			steps[i] = [];
			result[i] = [];
			for (var j = 0; j < this.AxDimension; j++) {
				result[i][j] = this.matrixA[j][i];
				var e = this.matrixA[j][i];
				var a = e >= 0 ? " " + e : e;
				steps[i][j] = `A[${j + 1}][${i + 1}] = ${a} -> A^t[${i + 1}][${j + 1}] = ${a}`;
				//steps[i][j] = `A[${j + 1}][${i + 1}] = ${this.matrixA[j][i]} -> A^t[${i + 1}][${j + 1}] = ${this.matrixA[j][i]}`;
			}
		}

		var string = "Realizando la transposición de la matriz A...\r";
		string += "\r";
		string += "Procedimiento analítico:\r";
		string += "Los elementos de columnas de A se escriben como los de las filas de A^t\r";

		for (i = 0; i < this.AyDimension; i++) {
			for (var j = 0; j < this.AxDimension; j++) {
				string += "\t" + steps[i][j] + "\r";
			}
		}

		string += "\r";
		string += "Transponiendo la matriz:\r";
		string += "=" + this.matrixToString(result);

		this.printOnConsole(string);
	}

	scalarXMatrix() {

		var k = document.getElementsByClassName("k")[0];

		if (k.value === "") {
			this.printOnConsole("Introduce el escalar K, por favor.");
			return;

		} else {

			var scalar = parseFloat(k.value);

			this.cleanBoard();
			this.rebuildMatrix();
			var result = [];
			for (var i = 0; i < 3; i++)
				result[i] = [];
			var steps = [];
			var step1 = [];
			for (i = 0; i < this.AyDimension; i++) {
				steps[i] = [];
				step1[i] = [];
				for (var j = 0; j < this.AxDimension; j++) {
					//Parsing is necessary here since addition operator can also concatenate strings
					result[i][j] = Math.round((parseFloat(this.matrixA[i][j]) * scalar * 100) / 100);
					var e = this.matrixA[i][j];
					var r = result[i][j];
					var a = e >= 0 ? " " + e : e;
					var r = r >= 0 ? " " + r : r;
					steps[i][j] = `A[${i + 1}][${j + 1}] * ${scalar} = ${a} * ${scalar} \t= ${r}`;
					step1[i][j] = `${a} * ${scalar}`;
				}
			}

			var string = "Realizando la multiplicación escalar...\r" + "\r";
			string += "Escalar por Matriz A:\r";
			string += scalar + "*" + this.matrixToString(this.matrixA) + "\r";


			string += "Procedimiento analítico: \r";
			for (i = 0; i < this.AyDimension; i++) {
				for (var j = 0; j < this.AxDimension; j++) {
					string += "\t" + steps[i][j] + "\r";
				}
			}

			string += "\r";
			string += "Multiplicando escalar por matriz:\r";
			string += "=" + this.matrixToString(step1) + "\r";
			string += "Resultado de k * A:\r";
			string += "=" + this.matrixToString(result);
			this.printOnConsole(string);
		}
	}


	subtractMatrix() {
		this.cleanBoard();
		this.rebuildMatrix();
		if (this.AxDimension != this.BxDimension || this.AyDimension != this.ByDimension) {
			this.printOnConsole("Solo se pueden sustraer matrices con igual dimensión.");
			return;
		} else {
			var result = [];
			for (var i = 0; i < 3; i++)
				result[i] = [];
			var steps = [];
			var step1 = [];
			for (i = 0; i < this.AyDimension; i++) {
				steps[i] = [];
				step1[i] = [];
				for (var j = 0; j < this.AxDimension; j++) {
					result[i][j] = Math.round((parseFloat(this.matrixA[i][j]) - parseFloat(this.matrixB[i][j])) * 100) / 100;
					var a = this.matrixA[i][j];
					var b = this.matrixB[i][j];
					var r = result[i][j];
					var a = a >= 0 ? " " + a : a;
					var b = b >= 0 ? " " + b : b;
					var r = r >= 0 ? " " + r : r;
					steps[i][j] = `A[${i + 1}][${j + 1}] - B[${i + 1}][${j + 1}] = ${a} - ${b} \t= ${r}`
					step1[i][j] = `${a} - ${b}`
				}
			}

			var string = "Realizando la sustractión de matrices...\r" + "\r";
			string += "Matriz A:\r";
			string += this.matrixToString(this.matrixA) + "\r";
			string += "Matriz B:\r";
			string += this.matrixToString(this.matrixB) + "\r";

			string += "Procedimiento analítico: \r";
			for (i = 0; i < this.AyDimension; i++) {
				for (var j = 0; j < this.AxDimension; j++) {
					string += "\t" + steps[i][j] + "\r";
				}
			}

			string += "\r";
			string += "Sustrayendo matrices:\r";
			string += "=" + this.matrixToString(step1) + "\r";
			string += "Resultado de A - B:\r";
			string += "=" + this.matrixToString(result);
			this.printOnConsole(string);
		}
	}

	addMatrix() {
		this.cleanBoard();
		this.rebuildMatrix();
		if (this.AxDimension != this.BxDimension || this.AyDimension != this.ByDimension) {
			this.printOnConsole("Matrices tienen diferentes dimensiones.");
			return;
		}
		var result = [];
		for (var i = 0; i < 3; i++)
			result[i] = [];
		var steps = [];
		var step1 = [];
		for (i = 0; i < this.AyDimension; i++) {
			steps[i] = [];
			step1[i] = [];
			for (var j = 0; j < this.AxDimension; j++) {
				//Parsing is necessary here since addition operator can also concatenate strings
				result[i][j] = Math.round((parseFloat(this.matrixA[i][j]) + parseFloat(this.matrixB[i][j])) * 100) / 100;
				var a = this.matrixA[i][j];
				var b = this.matrixB[i][j];
				var r = result[i][j];
				var a = a >= 0 ? " " + a : a;
				var b = b >= 0 ? " " + b : b;
				var r = r >= 0 ? " " + r : r;
				steps[i][j] = `A[${i + 1}][${j + 1}] + B[${i + 1}][${j + 1}] = ${a} + ${b} \t= ${r}`;
				step1[i][j] = `${a} + ${b}`;
			}
		}

		var string = "Realizando la adición de matrices...\r" + "\r";
		string += "Matriz A:\r";
		string += this.matrixToString(this.matrixA) + "\r";
		string += "Matriz B:\r";
		string += this.matrixToString(this.matrixB) + "\r";


		string += "Procedimiento analítico: \r";
		for (i = 0; i < this.AyDimension; i++) {
			for (var j = 0; j < this.AxDimension; j++) {
				string += "\t" + steps[i][j] + "\r";
			}
		}

		string += "\r";
		string += "Adicionando las matrices:\r";
		string += "=" + this.matrixToString(step1) + "\r";
		string += "Resultado de A + B:\r";
		string += "=" + this.matrixToString(result);
		this.printOnConsole(string);
	}

	multiplyMatrix() {
		this.cleanBoard();
		this.rebuildMatrix();
		if (this.AxDimension != this.ByDimension) {
			this.printOnConsole("El número de columnas de la matriz A es diferente del número de filas de B.");
			return;
		}
		var result = [];
		for (var i = 0; i < 3; i++)
			result[i] = [];
		var steps = [];
		var step1 = [];

		var rowsRes = this.AyDimension;
		var columnsRes = this.BxDimension;

		for (i = 0; i < rowsRes; i++) {
			steps[i] = [];
			step1[i] = [];
			for (j = 0; j < columnsRes; j++) {
				var sum = 0;
				for (var k = 0; k < this.AxDimension; k++) {
					sum += this.matrixA[i][k] * this.matrixB[k][j];
				}
				result[i][j] = Math.round(sum * 100) / 100;
				var r = result[i][j];
				var r = r >= 0 ? " " + r : r;
				steps[i][j] = `A[${i + 1}][${0 + 1}] * B[${0 + 1}][${j + 1}] + A[${i + 1}][${1 + 1}] * B[${1 + 1}][${j + 1}] + A[${i + 1}][${2 + 1}] * B[${2 + 1}][${j + 1}] = ${this.matrixA[i][0]} * ${this.matrixB[0][j]} + ${this.matrixA[i][1]} * ${this.matrixB[1][j]} + ${this.matrixA[i][2]} * ${this.matrixB[2][j]} \t= ${r}`;
				step1[i][j] = `${this.matrixA[i][0]} * ${this.matrixB[0][j]} + ${this.matrixA[i][1]} * ${this.matrixB[1][j]} + ${this.matrixA[i][2]} * ${this.matrixB[2][j]}`;
			}
		}

		var string = "Realizando la multiplicación de elementos de las matrices...\r" + "\r";
		string += "Matriz A:\r";
		string += this.matrixToString(this.matrixA) + "\r";
		string += "Matriz B:\r";
		string += this.matrixToString(this.matrixB) + "\r";

		string += "Procedimiento analítico: \r";
		string += "Multiplicación de filas de A por columnas de B: \r";
		for (var i = 0; i < rowsRes; i++) {
			for (var j = 0; j < columnsRes; j++) {
				string += "\t" + steps[i][j] + "\r";
			}
		}

		string += "\r";
		string += "Multiplicando las matrices:\r";
		string += "=" + this.matrixToString(step1) + "\r";
		string += "Resultado de A x B:\r";
		string += "=" + this.matrixToString(result);
		this.printOnConsole(string);
	}

	printOnConsole(message) {
		console.log(message);
	}

	calculateDeterminant() {
		this.rebuildMatrix();
		if (this.AxDimension != this.AyDimension) {
			this.determinantA = null;
			this.printOnConsole("No es una matriz cuadrada. Por ello, no se puede calcular la determinante.");
			return;
		}
		var determinant;
		var steps = [];

		if (this.AxDimension == 1) {
			determinant = this.matrixA[0][0];
			steps.push(`det(A) = ${determinant}`);
		}

		if (this.AxDimension == 2) {
			determinant = (this.matrixA[0][0] * this.matrixA[1][1]) - (this.matrixA[0][1] * this.matrixA[1][0]);
			steps.push(`det(A) =  (A[${0 + 1}][${0 + 1}] * A[${1 + 1}][${1 + 1}]) - (A[${0 + 1}][${1 + 1}] * A[${1 + 1}][${0 + 1}]) = (${this.matrixA[0][0]} * ${this.matrixA[1][1]}) - (${this.matrixA[0][1]} * ${this.matrixA[1][0]}) = ${determinant}`);
		}

		if (this.AxDimension == 3) {
			var d1, d2, d3, d4, d5, d6;
			d1 = this.matrixA[0][0] * this.matrixA[1][1] * this.matrixA[2][2];
			d2 = this.matrixA[0][1] * this.matrixA[1][2] * this.matrixA[2][0];
			d3 = this.matrixA[0][2] * this.matrixA[1][0] * this.matrixA[2][1];
			d4 = this.matrixA[0][2] * this.matrixA[1][1] * this.matrixA[2][0];
			d5 = this.matrixA[0][0] * this.matrixA[1][2] * this.matrixA[2][1];
			d6 = this.matrixA[0][1] * this.matrixA[1][0] * this.matrixA[2][2];
			determinant = Math.round((d1 + d2 + d3 - d4 - d5 - d6) * 100) / 100;
			steps.push(`Aplicando regla de Sarrus`);
			steps.push(`\tdet(A) = d1 + d2 + d3 - d4 - d5 - d6\r`);
			steps.push(`d1 = A[${0 + 1}][${0 + 1}] * A[${1 + 1}][${1 + 1}] * A[${2 + 1}][${2 + 1}] \r \td1 = ${this.matrixA[0][0]} * ${this.matrixA[1][1]} * ${this.matrixA[2][2]} = ${d1} \r`);
			steps.push(`d2 = A[${0 + 1}][${1 + 1}] * A[${1 + 1}][${2 + 1}] * A[${2 + 1}][${0 + 1}] \r \td2 = ${this.matrixA[0][1]} * ${this.matrixA[1][2]} * ${this.matrixA[2][0]} = ${d2} \r`);
			steps.push(`d3 = A[${0 + 1}][${2 + 1}] * A[${1 + 1}][${0 + 1}] * A[${2 + 1}][${1 + 1}] \r \td3 = ${this.matrixA[0][2]} * ${this.matrixA[1][0]} * ${this.matrixA[2][1]} = ${d3} \r`);
			steps.push(`d4 = A[${0 + 1}][${2 + 1}] * A[${1 + 1}][${1 + 1}] * A[${2 + 1}][${0 + 1}] \r \td4 = ${this.matrixA[0][2]} * ${this.matrixA[1][1]} * ${this.matrixA[2][0]} = ${d4} \r`);
			steps.push(`d5 = A[${0 + 1}][${0 + 1}] * A[${1 + 1}][${2 + 1}] * A[${2 + 1}][${1 + 1}] \r \td5 = ${this.matrixA[0][0]} * ${this.matrixA[1][2]} * ${this.matrixA[2][1]} = ${d5} \r`);
			steps.push(`d6 = A[${0 + 1}][${1 + 1}] * A[${1 + 1}][${0 + 1}] * A[${2 + 1}][${2 + 1}] \r \td6 = ${this.matrixA[0][1]} * ${this.matrixA[1][0]} * ${this.matrixA[2][2]} = ${d6} \r`);
			steps.push(`det(A) = ${d1} + ${d2} + ${d3} - ${d4} - ${d5} - ${d6} \r \tdet(A) = ${determinant}`);
		}

		this.determinantA = determinant;

		var string = "Calculando la determinante...\r";
		string += "Matriz A:\r";
		string += this.matrixToString(this.matrixA) + "\r";
		string += "Procedimiento analítico\r";

		for (var i = 0; i < steps.length; i++) {
			string += "\t" + steps[i] + "\r";
		}

		string += "\rDeterminante de A: " + determinant;
		this.printOnConsole(string);
		return;
	}

	matrixToString(matrix) {
		var string = "";
		for (var i = 0; i < matrix.length; i++) {
			for (var j = 0; j < matrix[i].length; j++) {
				if (matrix[i][j] >= 0) {
					string += "\t" + " " + matrix[i][j] + "\t";
				} else {
					string += "\t" + matrix[i][j] + "\t";
				}
			}
			string += "\r";
		}
		return string;
	}

	cleanBoard() {
		var board = document.querySelectorAll("#console");
		board.value = "";
	}

	printOnConsole(val) {
		document.getElementById("console").value = val;
		autoResize.call(textarea);
	}

	rebuildMatrix() {
		var row1 = document.getElementsByClassName("m1r1");
		var row2 = document.getElementsByClassName("m1r2");
		var row3 = document.getElementsByClassName("m1r3");
		for (var i = 0; i < 3; i++) {
			this.matrixA[0][i] = row1[i].value;
			this.matrixA[1][i] = row2[i].value;
			this.matrixA[2][i] = row3[i].value;
		}
		row1 = document.getElementsByClassName("m2r1");
		row2 = document.getElementsByClassName("m2r2");
		row3 = document.getElementsByClassName("m2r3");
		for (var i = 0; i < 3; i++) {
			this.matrixB[0][i] = row1[i].value;
			this.matrixB[1][i] = row2[i].value;
			this.matrixB[2][i] = row3[i].value;
		}
		this.calculateDimensions();
	}

	calculateDimensions() {
		//Calculating matrix A's dimensions
		this.AyDimension = 3;
		this.AxDimension = 3;

		var count = 2;
		//If there's a whole column of 0's, we'll decrease the dimension and look at the next one.
		while (count >= 0 && this.matrixA[0][count] == 0 && this.matrixA[1][count] == 0 && this.matrixA[2][count] == 0) {
			this.AxDimension--;
			count--;
		}
		count = 2;
		//If there's a whole row of 0's, we'll decrease the dimension and look at the next one.
		while (count >= 0 && this.matrixA[count][0] == 0 && this.matrixA[count][1] == 0 && this.matrixA[count][2] == 0) {
			this.AyDimension--;
			count--;
		}

		//Calculating matrix B's dimensions in the same way
		this.ByDimension = 3;
		this.BxDimension = 3;

		var count = 2;
		while (count >= 0 && this.matrixB[0][count] == 0 && this.matrixB[1][count] == 0 && this.matrixB[2][count] == 0) {
			this.BxDimension--;
			count--;
		}
		count = 2;
		while (count >= 0 && this.matrixB[count][0] == 0 && this.matrixB[count][1] == 0 && this.matrixB[count][2] == 0) {
			this.ByDimension--;
			count--;
		}
	}
}

var mc = new MatrixCalculator();