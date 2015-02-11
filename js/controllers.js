angular.module('DuckieTorrent.controllers', ['DuckieTorrent.torrent'])


.controller('MainCtrl',
    function($scope, $rootScope, uTorrent, $q) {

        $scope.success = false;

        var pimpValues = {
            'gui.pro_installed': true,
            'offers.left_rail_offer_enabled': false,
            'offers.sponsored_torrent_offer_enabled': false,
            'show_bundles_tab': false,
            'offers.featured_content_badge_enabled': false,
            'gui.show_plus_upsell_nodes': false,
            'gui.show_gate_notify': false,
            'gui.show_plus_upsell': false,
            'gui.show_plus_av_upsell': false,
            'offers.content_offer_autoexec': false,
            'offers.featured_content_notifications_enabled': false,
            'offers.featured_content_rss_enabled': false
        };

        $scope.Pair = function() {
            
            if(window.location.protocol.indexOf("https") > -1) {
                if(confirm("Sorry, Pimp My uTorrent only works on HTTP due to restrictions. please click 'OK' to be directed to the http version and please try again.")) {
                    window.location.href = 'http://schizoduckie.github.io/PimpMyuTorrent/?from=https';        
                } else {
                    alert('Pimp My uTorrent does not work on HTTPS!! You can only browse the page and read!');
                }
            }
            uTorrent.AutoConnect().then(function() {
                $scope.rpc = uTorrent.getRemote();

                function pimp() {
                    $scope.pimp().then(function() {
                        $scope.success = true;
                        _gaq.push(['_trackEvent', 'Pimps', 'Success']);
                    });
                }

                function tryPimping() {
                    if ($scope.rpc.settings.set) {
                        pimp();
                    } else {
                        setTimeout(tryPimping, 500);
                    }
                }

                tryPimping();
            })
        }

        $scope.pimp = function() {
            return $q.all(Object.keys(pimpValues).map(function(key) {
                return $scope.rpc.settings.set(key, pimpValues[key]).then(function(result) {
                    console.log('Set ', key, 'to', pimpValues[key], 'Result:', result.btapp.settings.set);
                    return true;
                });
            }));
        }

        $scope.unpimp = function() { // WHY would you do that??!

            Object.keys(pimpValues).map(function(key) {
                $scope.rpc.settings.set(key, !pimpValues[key]).then(function(result) {
                    console.log('Set ', key, 'to', pimpValues[key], 'Result:', result.btapp.settings.set);
                });
            })
            _gaq.push(['_trackEvent', 'UnPimps', 'Success']);
        }




    })
