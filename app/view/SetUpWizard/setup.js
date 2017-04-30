/**
 * Created by Harprabh Sangha on 4/1/2017.
 */

// var app = angular.module('csApp');
//
// // angular.module('csApp').controller('ChooseIndCtrl', function ($scope) {
// app.controller('ChooseIndCtrl',

(function () {
    'use strict';
    angular.module('csApp').controller('ChooseIndCtrl', setup);
    view.$inject = ['$scope', 'HomeService'];


    function view($scope, HomeService){

        $scope.formData = {
            general: true,
            studentRecords: false,
            health: false,
            pci: false,
            other: false
        };

        var general = $scope.formData.general;
        var studentRecords = $scope.formData.studentRecords;
        var health = $scope.formData.health;
        var pci = $scope.formData.pci;
        var other = $scope.formData.other;

        //var foo = require ('../../api/routes/api');

        //DownloadFrameWorks("general");

        // CheckBoxClicked Handles Choose Industry check boxes

        $scope.submitIndChoice = function () {
            console.log("Hello Submit Button");

            if ($scope.formData.other) {
                console.log("Other Selected making everything true");
                $scope.formData.general = true;
                $scope.formData.studentRecords = true;
                $scope.formData.health = true;
                $scope.formData.pci = true;
                $scope.formData.other = true;
            }

            if ($scope.formData.general === true) {
                console.log("User wants General Frameworks");
            }

            if ($scope.formData.health === true) {
                console.log("User wants to Load health")
            }

            if ($scope.formData.studentRecords === true) {
                console.log("User wants to load studentRecords")
            }

            if ($scope.formData.pci === true) {
                console.log("USer wants to load pci")
            }

        };
        // $scope.CheckBoxClicked = function (id) {
        //
        //     switch (id) {
        //         case 0: // 0 : General Check Box
        //             if ($scope.formData.general == true) {
        //                 DownloadFrameWorks("general");
        //             } else {
        //                 RemoveFrameWork("general");
        //             }
        //             break;
        //         case 1:  // 1 : studentRecords is Clicked
        //             if ($scope.formData.studentRecords == true) {
        //                 DownloadFrameWorks("studentRecords");
        //             } else {
        //                 RemoveFrameWork("studentRecords");
        //             }
        //             break;
        //         case 2:  // 2 : health is Clicked
        //             if ($scope.formData.health == true) {
        //                 DownloadFrameWorks("health");
        //             } else {
        //                 RemoveFrameWork("health");
        //             }
        //             break;
        //         case 3: // 3 : pci is Clicked
        //             if ($scope.formData.pci == true) {
        //                 DownloadFrameWorks("pci");
        //             } else {
        //                 RemoveFrameWork("pci");
        //             }
        //             break;
        //         case 4: // 4 : other is Clicked
        //             if ($scope.formData.other == true) {
        //                 DownloadFrameWorks("other");
        //             } else {
        //                 RemoveFrameWork("other");
        //             }
        //             break;
        //     }
        //
        // };

        $scope.onSubmit = function () {

        }

        function DownloadFrameWorks(industry) {
            console.log("Download FrameWorks Industry " + industry);


        }

        function RemoveFrameWork(industry) {
            console.log("Remove FrameWork Industry " + industry);
        }
    }

})();









