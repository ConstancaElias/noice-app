const fetchParams = {
    method: "GET",
    mode: "cors",
    cache: "default",
};
const backgroundColor = [
    "#0074D9",
    "#FF4136",
    "#2ECC40",
    "#FF851B",
    "#3e95cd",
    "#8e5ea2",
    "#3cba9f",
    "#e8c3b9",
    "#ff4000",
    "#00ffff",
    "#ff00ff",
    "#998F8F",
    "#E89513",
    "#9F25CF",
    "#c45850",
    "#1B6DF1",
    "#F01BF1",
];

let datafileChart = null;
let tablespaceChart = null;
let pdbChart = null;
let memoryChart = null;
let sessionChart = null;
let cpuChart = null;

function clearChart(objChart) {
    if (objChart != null) {
        objChart.destroy();
    }
}

const url = "http://localhost:3000/api/";

function fetchTablespaceHistory(argument) {
    clearChart(tablespaceChart);
    fetch(url + "tablespaces/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.name === label);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.used),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });

            tablespaceChart = new Chart(ctx, {
                type: "line",
                label: labels,
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    responsive: false,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Size Used (MB)",
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Tablespaces- Size Used (MB)",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchDatafileHistory(argument) {
    clearChart(datafileChart);
    fetch(url + "datafiles/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.datafile_name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.datafile_name === label).slice(-30);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.used),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });

            datafileChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Size Used (MB)",
                                },
                            },
                        ],
                    },
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Datafiles- Size Used (MB)",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchPDB(argument) {
    clearChart(pdbChart);
    fetch(url + "pdbs/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myPDBChart");

            let history = data.history;

            let labels = data.entities.map((e) => e.name);

            let datasets = [];

            let label_history;

            let graph_labels;

            labels.forEach((label, idx) => {
                label_history = history.filter((e) => e.name === label);
                datasets.push({
                    label: label,
                    data: label_history.map((e) => e.size),
                    backgroundColor: "transparent",
                    borderColor: backgroundColor[idx],
                    borderWidth: 1,
                });
                if (idx === labels.length - 1) {
                    graph_labels = label_history.map((e) => e.tstp);
                }
            });

            pdbChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: graph_labels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value of Size (GB)",
                                },
                            },
                        ],
                    },
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "PDBs Size",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function getSessions(argument) {
    clearChart(sessionChart);
    fetch(url + "sessions/total/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("mySessionChart");

            let vals = [];

            let datasets = new Map();
            data.forEach(function (val) {
                vals.push([parseInt(`${val.total}`), `${val.tstp}`]);
            });

            vals.forEach(function (v) {
                datasets.set(v[1], v[0]);
            });
            sessionChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(datasets.keys()),
                    datasets: [
                        {
                            label: "Session value",
                            data: Array.from(datasets.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[1],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Number of Sessions",
                                },
                            },
                        ],
                    },
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Total of Sessions Over Time",
                    },
                },
            });
        })
        .catch((err) => {
            console.log(err);
            console.log("Error Getting Data From API");
        });
}

function fetchCPU(argument) {
    clearChart(cpuChart);
    fetch(url + "cpu/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myCPUPie");

            let cpuMap = new Map();

            data.forEach(function (character) {
                cpuMap.set(`${character.username}`, `${character.value}`);
            });

            cpuChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Array.from(cpuMap.keys()),

                    datasets: [
                        {
                            data: Array.from(cpuMap.values()),
                            backgroundColor: backgroundColor,
                        },
                    ],
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "CPU Usage (%)",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function fetchMemory(argument) {
    clearChart(memoryChart);
    fetch(url + "memory/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myMemoryPie");

            let vals = [];
            let total = new Map();
            let used = new Map();

            data.forEach(function (val) {
                vals.push([parseInt(`${val.total}`), parseInt(`${val.used}`), `${val.tstp}`]);
            });

            vals.forEach(function (v) {
                total.set(v[2], v[0]);
                used.set(v[2], v[1]);
            });

            memoryChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(total.keys()),
                    datasets: [
                        {
                            label: "Total",
                            data: Array.from(total.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[1],
                            borderWidth: 1,
                        },
                        {
                            label: "Used",
                            data: Array.from(used.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[6],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value (MB)",
                                },
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Memory Usage (MB)",
                    },
                    responsive: false,
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getUsers() {
    document.getElementById("output").innerHTML = "";

    fetch(url + "users", fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            data.forEach(function (user) {
                count++;
                output +=
                    `
                <tr>
                <td "id="name_` +
                    count +
                    `">${user.name}</td>
                <td id="status_` +
                    count +
                    `">${user.status}</td>
                <td id="temp_tablespace_` +
                    count +
                    `"> <a href="details.html?tablespace=${user.temp_tablespace}">${user.temp_tablespace} </a></td>
                <td id="temp_tablespace_` +
                    count +
                    `"> <a href="details.html?tablespace=${user.default_tablespace}">${user.default_tablespace} </a></td>
                <td id="last_login_` +
                    count +
                    `"> ${user.last_login}</td>
              </tr>            
             <!-- End -->
                         `;
            });

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getTableSpaces(argument) {
    document.getElementById("output").innerHTML = "";

    fetch(url + "tablespaces/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";
            let tablespaceMap = new Map();
            data["entities"].forEach(function (names) {
                tablespaceMap.set(`${names.name}`, []);
            });
            data["history"].forEach(function (tablespaces) {
                if (tablespaceMap.has(`${tablespaces.name}`)) {
                    tablespaceMap.set(`${tablespaces.name}`, [
                        `${tablespaces.name}`,
                        `${tablespaces.total}`,
                        `${tablespaces.free}`,
                        `${tablespaces.used}`,
                    ]);
                }
            });
            for (const [key, value] of tablespaceMap.entries()) {
                count++;
                output +=
                    `
                <tr>
                    <td id="name_` +
                    count +
                    `"> <a href="details.html?tablespace=${value[0]}">${value[0]}</a></td>
                    <td id="total_` +
                    count +
                    `">${value[1]}</td>
                    <td id="free_` +
                    count +
                    `">${value[2]}</td>
                    <td id="used_` +
                    count +
                    `">${value[3]}</td>
                </tr>       
          
                     `;
            }

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
    getDatafileDetails;
}

function getDatafiles(argument) {
    document.getElementById("output").innerHTML = "";

    fetch(url + "datafiles/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            let datafilesMap = new Map();

            data["entities"].forEach(function (names) {
                datafilesMap.set(`${names.datafile_name}`, []);
            });

            data["history"].forEach(function (datafiles) {
                if (datafilesMap.has(`${datafiles.datafile_name}`)) {
                    datafilesMap.set(`${datafiles.datafile_name}`, [
                        `${datafiles.tablespace_name}`,
                        `${datafiles.datafile_name}`,
                        `${datafiles.total}`,
                        `${datafiles.free}`,
                        `${datafiles.used}`,
                    ]);
                }
            });
            for (const [key, value] of datafilesMap.entries()) {
                count++;
                output +=
                    `
                <tr>
                    <td id="t_name_` +
                    count +
                    `"> <a href="details.html?tablespace=${value[0]}">${value[0]}</a></td>
                    <td id="d_name_` +
                    count +
                    `">${value[1]}</td>
                    <td id="total_` +
                    count +
                    `">${value[2]}</td>
                    <td id="free_` +
                    count +
                    `">${value[3]}</td>
                    <td id="used_` +
                    count +
                    `">${value[4]}</td>

                </tr>       
          
                     `;
            }

            document.getElementById("output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getTablespaceDetails(name, argument) {
    document.getElementById("tablespaceDetails").innerHTML = "";

    fetch(url + "tablespaces/history?roupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            let tablespaceMap = new Map();

            data["history"].forEach(function (tablespace) {
                if (`${tablespace.name}` === name) {
                    tablespaceMap.set(`${tablespace.name}`, [
                        `${tablespace.name}`,
                        `${tablespace.total}`,
                        `${tablespace.free}`,
                        `${tablespace.used}`,
                        `${tablespace.percentage_free}`,
                        `${tablespace.percentage_used}`,
                    ]);
                }
            });
            for (const [key, value] of tablespaceMap.entries()) {
                count++;
                output +=
                    `<li class="list-group-item" id="d_total_` +
                    count +
                    `">Total: ${value[1]}</li>
                    <li class="list-group-item" id="d_free_` +
                    count +
                    `">Free: ${value[2]}</li>    
                    <li class="list-group-item" id="d_used_` +
                    count +
                    `">Used: ${value[3]}</li>     
                    <li class="list-group-item" id="d_pused_` +
                    count +
                    `">Free (%): ${value[4]} %</li>
                     <li class="list-group-item" id="d_free_` +
                    count +
                    `">Used (%): ${value[5]} %</li> 
                     `;
            }

            document.getElementById("tablespaceDetails").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getDatafileDetails(name, argument) {
    document.getElementById("datafile_output").innerHTML = "";

    fetch(url + "datafiles/history?tablespace=" + name + "&groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            let count = 0;
            let output = "";

            let datafilesMap = new Map();

            data["history"].forEach(function (datafiles) {
                datafilesMap.set(`${datafiles.datafile_name}`, [
                    `${datafiles.datafile_name}`,
                    `${datafiles.total}`,
                    `${datafiles.free}`,
                    `${datafiles.used}`,
                ]);
            });
            for (const [key, value] of datafilesMap.entries()) {
                count++;
                output +=
                    `
                <tr>     
                    <td id="d_name_` +
                    count +
                    `">${value[0]}</td>
                    <td id="total_` +
                    count +
                    `">${value[1]}</td>
                    <td id="free_` +
                    count +
                    `">${value[2]}</td>
                    <td id="used_` +
                    count +
                    `">${value[3]}</td>

                </tr>       
          
                     `;
            }

            document.getElementById("datafile_output").innerHTML = output;
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getTablespaceDetailGraph(name, argument) {
    clearChart(tablespaceChart);
    fetch(url + "tablespaces/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myTablespaceChart");

            let vals = [];
            let total = new Map();
            let used = new Map();

            data["history"].forEach(function (val) {
                if (`${val.name}` === name) {
                    vals.push([parseInt(`${val.total}`), parseInt(`${val.used}`), `${val.tstp}`]);
                }
            });
            vals = vals.slice(-30);
            vals.forEach(function (v) {
                total.set(v[2], v[0]);
                used.set(v[2], v[1]);
            });

            datafileChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(total.keys()),
                    datasets: [
                        {
                            label: "Total",
                            data: Array.from(total.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[1],
                            borderWidth: 1,
                        },
                        {
                            label: "Used",
                            data: Array.from(used.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[6],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value (MB)",
                                },
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Tablespace Usage (MB)",
                    },
                    responsive: false,
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

function getDatafileDetailGraph(name, argument) {
    clearChart(datafileChart);
    fetch(url + "datafiles/history?groupBy=" + argument, fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myDatafileChart");

            let vals = [];
            let total = new Map();
            let used = new Map();

            data["history"].forEach(function (val) {
                if (`${val.tablespace_name}` === name) {
                    vals.push([parseInt(`${val.total}`), parseInt(`${val.used}`), `${val.tstp}`]);
                }
            });
            vals = vals.slice(-30);
            vals.forEach(function (v) {
                total.set(v[2], v[0]);
                used.set(v[2], v[1]);
            });

            datafileChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: Array.from(total.keys()),
                    datasets: [
                        {
                            label: "Total",
                            data: Array.from(total.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[1],
                            borderWidth: 1,
                        },
                        {
                            label: "Used",
                            data: Array.from(used.values()),
                            backgroundColor: "transparent",
                            borderColor: backgroundColor[6],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Value (MB)",
                                },
                            },
                        ],
                    },
                    title: {
                        display: true,
                        text: "Datafile Usage (MB)",
                    },
                    responsive: false,
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}

/*function fetchMemory() {
    document.getElementById("myMemoryPie").innerHTML = ""
    fetch(url + "memory/history", fetchParams)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            var ctx = document.getElementById("myMemoryPie");
            let characterData = [];
            data.forEach(function(character) {
                characterData.push([parseInt(character.total), parseInt(character.used)]);
            });
            var myPieChart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Total", "Used"],
                    datasets: [{
                        data: characterData[characterData.length - 1],
                        backgroundColor: ["#0074D9", "#FF4136"],
                    }, ],
                },
                options: {
                    responsive: true,
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Memory Usage",
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                    },
                },
            });
        })
        .catch((err) => {
            console.log("Error Getting Data From API");
        });
}*/
