(function () {
    'use strict';

    angular.module('csApp').controller('ViewController', view);

    view.$inject = ['HomeService', '$scope'];
    function view(HomeService, $scope) {
        var vm = this;
        var tree = new TreeModel();
        vm.selectedNode = null;
        vm.selectedNodeScope = null;

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
        
        vm.expandAll = function() {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        vm.collapseAll = function() {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        vm.toggle = function(node, event) {
            node.toggle();
            event.preventDefault();
        };

        vm.selectNode = function (node, scope, event) {
            if (event.target.nodeName === "DIV") {
                vm.selectedNode = node;
                vm.selectedNodeScope = scope;
            }
        };

        vm.addSubItem = function(scope) {
            var nodeData = scope.$modelValue;
            nodeData.children.push({
                id: nodeData.id * 10 + nodeData.children.length,
                name: nodeData.name + ' ' + (nodeData.children.length + 1),
                children: []
            });
            // if (vm.selectedNode) {
            //     var nodeData = vm.selectedNodeScope.$modelValue;
            //     nodeData.children.push({
            //         id: nodeData.id * 10 + nodeData.children.length,
            //         name: nodeData.name + ' ' + (nodeData.children.length + 1),
            //         children: []
            //     });
            // }
        };

        vm.edit = function (node, scope) {
            var newName = prompt("Enter new name", node.name);

            if (newName != null && node.name !== newName) {
                node.name = newName;
            }

            // if (vm.selectedNode) {
            //     var newName = prompt("Enter new name", vm.selectedNode.name);
            //
            //     if (newName != null && vm.selectedNode.name !== newName) {
            //         vm.selectedNode.name = newName;
            //     }
            // }
        };
        
        vm.remove = function(scope) {
            scope.remove();
            // if (vm.selectedNode) {
            //     vm.selectedNodeScope.remove();
            //
            //     vm.selectedNode = null;
            //     vm.selectedNodeScope = null;
            // }
        };

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

        //

        document.getElementById('import').onclick = function() {
            var files = document.getElementById('selectFiles').files;
            console.log(files);
            if (files.length <= 0) {
                return false;
            }

            var fr = new FileReader();

            fr.onload = function(e) {
                console.log(e);
                var result = JSON.parse(e.target.result);

                vm.data = result;
                $scope.$apply();

                var formatted = JSON.stringify(result, null, 2);
                document.getElementById('result').value = formatted;
            };

            fr.readAsText(files.item(0));
        };

        $(document).on('change', ':file', function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        $(document).ready( function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }

            });
        });
    }
})();