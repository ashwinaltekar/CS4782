(function () {
    'use strict';

    angular.module('csApp').controller('LoginController', login);

    login.$inject = ['LoginService'];
    function login(LoginService) {
        var vm = this;
        vm.loginForm = {username: '', password: ''};
        vm.showErrorMessage = false;
        vm.errorMessage = '';

        vm.login = login;

        function login(form) {
            // LoginService.authenticate(form)
            //     .then(function () {
            //
            //     })
            //     .catch(function () {
            //
            //     });
        }

        // vm.selectedNode = null;
        // vm.selectedNodeScope = null;
        // vm.fileName = "";
        // vm.industriesAndFrameworks = [];
        // vm.frameworkDetail = [];
        // vm.customFramework = [];
        //
        // HomeService.getFrameworkDetails("nistcsf")
        //     .then(function (response) {
        //         vm.frameworkDetail = response[0].begin;
        //     });
        //
        // HomeService.getIndustriesAndFrameworks()
        //     .then(function (response) {
        //         vm.industriesAndFrameworks = response;
        //     });
        //
        // vm.expandAll = expandAll;
        // vm.collapseAll = collapseAll;
        // vm.toggleNodeCollapse = toggleNodeCollapse;
        // vm.toggleNodeCheck = toggleNodeCheck;
        // vm.cascadeCheckFromParent = cascadeCheckFromParent;
        //
        // vm.loadFile = loadFile;
        // vm.importJson = importJson;
        // vm.exportJson = exportJson;
        //
        // vm.selectNode = selectNode;
        // vm.clearSelection = clearSelection;
        //
        // vm.add = add;
        // vm.edit = edit;
        // vm.edit = edit;
        // vm.remove = remove;
        //
        // function expandAll() {
        //     $scope.$broadcast('angular-ui-tree:expand-all');
        // }
        //
        // function collapseAll() {
        //     $scope.$broadcast('angular-ui-tree:collapse-all');
        // }
        //
        // function toggleNodeCollapse(node, event) {
        //     node.toggle();
        //     event.preventDefault();
        // }
        //
        // function toggleNodeCheck(node, event) {
        //     node.checked = !node.checked;
        //
        //     if (node.checked) {
        //         HomeService.getFrameworkDetails(node.code)
        //             .then(function (response) {
        //                 vm.frameworkDetail = [].concat(vm.frameworkDetail, response[0].begin);
        //             });
        //     }
        //
        //     // if (node.children.length) {
        //     //     vm.cascadeCheckFromParent(node.children, node.checked);
        //     // }
        //     event.preventDefault();
        // }
        //
        // function cascadeCheckFromParent(children, status) {
        //     for (var i = 0; i < children.length; ++i) {
        //         var node = children[i];
        //         node.checked = status;
        //         if (node.children.length)
        //             vm.cascadeCheckFromParent(node.children, status)
        //     }
        // }
        //
        // function selectNode(node, scope, event) {
        //     if (event.target.nodeName === "DIV") {
        //         vm.selectedNode = node;
        //         vm.selectedNodeScope = scope;
        //     }
        // }
        //
        // function clearSelection() {
        //     vm.selectedNode = null;
        //     vm.selectedNodeScope = null;
        // }
        //
        // function add(list) {
        //     addNodeDialog(list);
        // }
        //
        // function edit() {
        //     if (vm.selectedNode) {
        //         editNodeDialog(vm.selectedNode);
        //     }
        // }
        //
        // function remove() {
        //     if (vm.selectedNode && vm.selectedNodeScope) {
        //         removeNodeDialog(vm.selectedNode);
        //     }
        // }
        //
        // function addNodeDialog(list) {
        //     ngDialog
        //         .openConfirm({
        //             template: 'view/modify-node-dialog.html',
        //             className: 'ngdialog-theme-default',
        //             controller: ['$scope', function($scope) {
        //                 var vm = this;
        //                 vm.node = {
        //                     uId: "custom-" + new Date().getTime(),
        //                     name: "",
        //                     description: "",
        //                     children: []
        //                 };
        //             }],
        //             controllerAs: 'vm'
        //         })
        //         .then(function (node) {
        //             if (vm.selectedNodeScope) {
        //                 var nodeData = vm.selectedNodeScope.$modelValue;
        //                 nodeData.children.push(node);
        //             } else {
        //                 list.push(node);
        //             }
        //         }, function () {
        //             // Cancelled
        //         });
        // }
        //
        // function editNodeDialog(selectedNode) {
        //     ngDialog
        //         .openConfirm({
        //             template: 'view/modify-node-dialog.html',
        //             className: 'ngdialog-theme-default',
        //             resolve: {
        //                 node: function () {
        //                     return selectedNode;
        //                 }
        //             },
        //             controller: ['node', function(node) {
        //                 var vm = this;
        //                 vm.node = {
        //                     uId: node.uId,
        //                     name: node.name || "",
        //                     description: node.description || "",
        //                     children: node.children
        //                 };
        //             }],
        //             controllerAs: 'vm'
        //         })
        //         .then(function (node) {
        //             if (selectedNode.name !== node.name) {
        //                 selectedNode.name = node.name;
        //                 selectedNode.description = node.description;
        //             }
        //         }, function () {
        //             // Cancelled
        //         });
        // }
        //
        // function removeNodeDialog(selectedNode) {
        //     ngDialog
        //         .openConfirm({
        //             template: 'view/remove-node-dialog.html',
        //             className: 'ngdialog-theme-default',
        //             resolve: {
        //                 node: function () {
        //                     return selectedNode;
        //                 }
        //             },
        //             controller: ['node', function(node) {
        //                 var vm = this;
        //                 vm.node = {
        //                     uId: node.uId,
        //                     name: node.name || "",
        //                     description: node.description || "",
        //                     children: node.children
        //                 };
        //             }],
        //             controllerAs: 'vm'
        //         })
        //         .then(function (node) {
        //             vm.selectedNodeScope.remove();
        //
        //             vm.selectedNode = null;
        //             vm.selectedNodeScope = null;
        //         }, function () {
        //             // Cancelled
        //         });
        // }
        //
        // function loadFile() {
        //     vm.fileToImport = event.target.files[0];
        //
        //     if (vm.fileToImport) {
        //         vm.fileName = vm.fileToImport.name;
        //         $scope.$apply();
        //
        //         var fr = new FileReader();
        //
        //         fr.onload = function(e) {
        //             try {
        //                 vm.parsedResult = JSON.parse(e.target.result);
        //
        //                 $scope.$apply();
        //             } catch(e) {
        //                 ngDialog.open({ template: 'view/import-error-dialog.html', className: 'ngdialog-theme-default' });
        //             }
        //         };
        //
        //         fr.readAsText(vm.fileToImport);
        //     }
        // }
        //
        // function importJson() {
        //     if (vm.parsedResult) {
        //         vm.customFramework = vm.parsedResult;
        //     }
        // }
        //
        // function exportJson(col, data) {
        //     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        //     var dlAnchorElem = document.getElementById('exportHelper');
        //     dlAnchorElem.setAttribute("href", dataStr);
        //     dlAnchorElem.setAttribute("download", "security-fw-" + col + new Date().getTime() + ".json");
        //     dlAnchorElem.click();
        // }
    }
})();