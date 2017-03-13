(function () {
    'use strict';

    angular.module('csApp').controller('ViewController', view);

    view.$inject = ['$scope', 'HomeService', 'ngDialog'];
    function view($scope, HomeService, ngDialog) {
        var vm = this;
        var tree = new TreeModel();
        vm.selectedNode = null;
        vm.selectedNodeScope = null;
        vm.fileName = "";

        HomeService.get()
            .then(function (response) {
                vm.data = response;
                vm.root = tree.parse(vm.data);

                // var nodeFound = vm.root.first(idIn(["ID"]));
                // if (nodeFound) {
                //     console.log(nodeFound.getPath());
                // } else {
                //     console.error("!nodeFound");
                // }
            });

        vm.expandAll = expandAll;
        vm.collapseAll = collapseAll;
        vm.toggleNode = toggleNode;


        vm.loadFile = loadFile;
        vm.importJson = importJson;
        vm.exportJson = exportJson;

        vm.selectNode = selectNode;
        vm.clearSelection = clearSelection;

        vm.add = add;
        vm.edit = edit;
        vm.remove = remove;

        vm.moveLastToTheBeginning = function() {
            var a = vm.data.pop();
            vm.data.splice(0, 0, a);
        };

        function getNodePathArray(root, selectedNode) {
            for (var i = 0; i < root.children.length; i++) {
                if (root.children[i] === selectedNode)
                    return [selectedNode];
                else {
                    var path = getNodePathArray(root.children[i], selectedNode);
                    if (path)
                        return path.unshift(selectedNode);
                }
            }
            return null;
        }


        // Helper function to check if a node id matches any of the given ids
        function idIn(ids) {
            console.log(ids);
            return function (node) {
                return ids.indexOf(node.model.uId) !== -1;
            };
        }

        function expandAll() {
            $scope.$broadcast('angular-ui-tree:expand-all');
        }

        function collapseAll() {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        }

        function toggleNode(node, event) {
            node.toggle();
            event.preventDefault();
        }

        function selectNode(node, scope, event) {
            if (event.target.nodeName === "DIV") {
                vm.selectedNode = node;
                vm.selectedNodeScope = scope;
            }
        }

        function clearSelection() {
            vm.selectedNode = null;
            vm.selectedNodeScope = null;
        }

        function add(list) {
            addNodeDialog(list);
        }

        function edit() {
            if (vm.selectedNode) {
                editNodeDialog(vm.selectedNode);
            }
        }

        function remove() {
            if (vm.selectedNode && vm.selectedNodeScope) {
                removeNodeDialog(vm.selectedNode);
            }
        }

        function addNodeDialog(list) {
            ngDialog
                .openConfirm({
                    template: 'view/modify-node-dialog.html',
                    className: 'ngdialog-theme-default',
                    controller: ['$scope', function($scope) {
                        var vm = this;
                        vm.node = {
                            uId: "custom-" + new Date().getTime(),
                            name: "",
                            description: "",
                            children: []
                        };
                    }],
                    controllerAs: 'vm'
                })
                .then(function (node) {
                    if (vm.selectedNodeScope) {
                        var nodeData = vm.selectedNodeScope.$modelValue;
                        nodeData.children.push(node);
                    } else {
                        list.push(node);
                    }
                }, function () {
                    // Cancelled
                });
        }

        function editNodeDialog(selectedNode) {
            ngDialog
                .openConfirm({
                    template: 'view/modify-node-dialog.html',
                    className: 'ngdialog-theme-default',
                    resolve: {
                        node: function () {
                            return selectedNode;
                        }
                    },
                    controller: ['node', function(node) {
                        var vm = this;
                        vm.node = {
                            uId: node.uId,
                            name: node.name || "",
                            description: node.description || "",
                            children: node.children
                        };
                    }],
                    controllerAs: 'vm'
                })
                .then(function (node) {
                    if (selectedNode.name !== node.name) {
                        selectedNode.name = node.name;
                        selectedNode.description = node.description;
                    }
                }, function () {
                    // Cancelled
                });
        }

        function removeNodeDialog(selectedNode) {
            ngDialog
                .openConfirm({
                    template: 'view/remove-node-dialog.html',
                    className: 'ngdialog-theme-default',
                    resolve: {
                        node: function () {
                            return selectedNode;
                        }
                    },
                    controller: ['node', function(node) {
                        var vm = this;
                        vm.node = {
                            uId: node.uId,
                            name: node.name || "",
                            description: node.description || "",
                            children: node.children
                        };
                    }],
                    controllerAs: 'vm'
                })
                .then(function (node) {
                    vm.selectedNodeScope.remove();

                    vm.selectedNode = null;
                    vm.selectedNodeScope = null;
                }, function () {
                    // Cancelled
                });
        }

        function loadFile() {
            vm.fileToImport = event.target.files[0];

            vm.fileName = vm.fileToImport.name;
            $scope.$apply();

            var fr = new FileReader();

            fr.onload = function(e) {
                try {
                    vm.parsedResult = JSON.parse(e.target.result);
                    vm.parsedResultView = JSON.stringify(vm.parsedResult, null, 2);

                    $scope.$apply();
                } catch(e) {
                    ngDialog.open({ template: 'view/import-error-dialog.html', className: 'ngdialog-theme-default' });
                }
            };

            fr.readAsText(vm.fileToImport);
        }

        function importJson() {
            if (vm.parsedResult) {
                vm.data = vm.parsedResult;
            }
        }

        function exportJson(data) {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            var dlAnchorElem = document.getElementById('exportHelper');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "security-fw-" + new Date().getTime() + ".json");
            dlAnchorElem.click();
        }
    }
})();