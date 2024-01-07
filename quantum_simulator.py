"""This is not my code ATM, this is from https://barghouthi.github.io/2021/08/05/quantum/

It is here only to grasp some ideas. It will be removed once my version will be done.
"""

import numpy as np


isq2 = 1.0 / (2.0 ** 0.5)


class QuantumState:
    def __init__(self, n):
        self.n = n
        self.state = np.zeros(2 ** self.n, dtype=np.complex)
        self.state[0] = 1

    # apply transformation t to bit i
    # (or i and i+1 in case of binary gates)
    def op(self, t, i):
        # I_{2^i}
        eyeL = np.eye(2 ** i, dtype=np.complex)

        # I_{2^{n-i-1}}
        # t.shape[0]**0.5 denotes how many bits t applies to
        # in case of NOT, t.shape[0]**0.5 == 1
        eyeR = np.eye(2 ** (self.n - i - int(t.shape[0] ** 0.5)),
                      dtype=np.complex)

        # eyeL ⊗ t ⊗ eyeR
        t_all = np.kron(np.kron(eyeL, t), eyeR)

        # apply transformation to state (multiplication)
        self.state = np.matmul(t_all, self.state)

    # Hadamard gate
    def hadamard(self, i):
        h_matrix = isq2 * np.array([
            [1, 1],
            [1, -1]
        ])
        self.op(h_matrix, i)

    # T gate
    def t(self, i):
        t_matrix = np.array([
            [1, 0],
            [0, isq2 + isq2 * 1j]
        ])
        self.op(t_matrix, i)

    # S gate
    def s(self, i):
        s_matrix = np.array([
            [1, 0],
            [0, 0 + 1j]
        ])
        self.op(s_matrix, i)

    # CNOT gate
    def cnot(self, i):
        cnot_matrix = np.array([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0]
        ])
        self.op(cnot_matrix, i)

    # Swap two qubits
    def swap(self, i):
        swap_matrix = np.array([
            [1, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]
        ])
        self.op(swap_matrix, i)


# Usage
computer = QuantumState(2)  # 2 qubits [1 0 0 0]
computer.hadamard(0)
print(computer.state)  # [0.70710678 0.70710678 0.         0.        ]

computer2 = QuantumState(2)  # 2 qubits [1 0 0 0]
computer2.cnot(0)
print(computer2.state)  # [1. 0. 0. 0.]

computer3 = QuantumState(2)  # 2 qubits [1 0 0 0]
computer3.swap(0)
print(computer3.state)  # [1. 0. 0. 0.]

computer4 = QuantumState(2)  # 2 qubits [1 0 0 0]
computer4.t(0)
print(computer4.state)  # [1.  +0.j 0.  +0.j 0.  +0.j 0.70710678+0.j]

computer5 = QuantumState(2)  # 2 qubits [1 0 0 0]
computer5.s(0)
print(computer5.state)  # [1. +0.j 0. +0.j 0. +0.j 0. +1.j]
