import { createStore } from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}

const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];

    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];

        shuffle.push(chosen);
    }

    const data = [];

    for (let i = 0; i < row; i++) {
        const rowData = [];

        data.push(rowData);

        for(let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++) {
        const vertical = Math.floor(shuffle[k] / cell);
        const horizontal = shuffle[k] % cell;

        data[vertical][horizontal] = CODE.MINE;
    }

    return data;
};

export default createStore({
    namespaced: true,

    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },

        timer: 0,
        halted: true,
        result: '',
        openedCount: 0,
    },

    getters: {

    },

    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine,
            };

            state.tableData = plantMine(row, cell, mine);
            state.halted = false;
            state.timer = 0;
            state.openedCount = 0;
            state.result = '';
        },

        [OPEN_CELL](state, {row, cell}) {
            let openedCount = 0;
            const checked = [];

            const checkAround = (row, cell) => {
                if (row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length) {
                    return;
                }

                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(state.tableData[row][cell])) {
                    return;
                }

                if (checked.includes(`${row}+/+${cell}`)) {
                    return;
                } else {
                    checked.push(`${row}+/+${cell}`);
                }

                let around = [];

                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1],
                        state.tableData[row - 1][cell],
                        state.tableData[row - 1][cell + 1]
                        
                    ])
                }

                around = around.concat([
                    state.tableData[row][cell - 1],
                    state.tableData[row][cell + 1]
                ]);

                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1],
                        state.tableData[row + 1][cell],
                        state.tableData[row + 1][cell + 1]
                    ]);
                }

                const counted = around.filter((v) => {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE,].includes(v);
                });

                if (counted.length === 0 && row > -1) {
                    const near = [];

                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }

                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);

                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }

                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    })
                }

                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }

                state.tableData[row][cell] = counted.length;
                // return counted.length;
            }
            
            checkAround(row, cell);

            let halted = false;
            let result;
            
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리 하였습니다.`;
            }

            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
            // state.tableData[row][cell] = count;
        },

        [CLICK_MINE](state, {row, cell}) {
            state.halted = true;
            state.tableData[row][cell] = CODE.CLICKED_MINE;
        },

        [FLAG_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.MINE) {
                state.tableData[row][cell] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][cell] = CODE.FLAG;
            }
        },

        [QUESTION_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                state.tableData[row][cell] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][cell] = CODE.QUESTION;
            }
        },

        [NORMALIZE_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                state.tableData[row][cell] = CODE.MINE;
            } else {
                state.tableData[row][cell] = CODE.NORMAL;
            }
        },

        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },

    actions: {

    }
});
