angular.module('DuckieTorrent.controllers', ['DuckieTorrent.torrent'])


/**
 * Main controller: Kicks in favorites display
 */
.controller('MainCtrl',
    function($scope, $rootScope, uTorrent) {


        var pimpValues = {
            'gui.pro_installed': true,
            'offers.left_rail_offer_enabled': false,
            'offers.sponsored_torrent_offer_enabled': false,
            'show_bundles_tab': false,
            'offers.featured_content_badge_enabled': false,
            'gui.show_plus_upsell_nodes': false,
            'gui.show_gate_notify': false,
            'gui.show_plus_upsell': false

        };

        $scope.Pair = function() {
            uTorrent.AutoConnect().then(function() {
                $scope.rpc = uTorrent.getRemote();
            })
        }

        $scope.pimp = function() {

            Object.keys(pimpValues).map(function(key) {
                window.bt.settings.set(key, pimpValues[key]).then(function(result) {
                    console.log('Set ', key, 'to', pimpValues[key], 'Result:', result.btapp.settings.set);
                });
            })

        }

        $scope.unpimp = function() { // WHY would you do that??!

            Object.keys(pimpValues).map(function(key) {
                window.bt.settings.set(key, !pimpValues[key]).then(function(result) {
                    console.log('Set ', key, 'to', pimpValues[key], 'Result:', result.btapp.settings.set);
                });
            })


        }




    })