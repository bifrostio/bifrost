'use strict';

(() => {
  let app = angular.module('bifrost');

  let controller = ($scope, $state, $http, async, FileUploader, Project,
                    Provision, Supporter, addressResolver) => {
    $scope.$emit('projects', []);
    $scope.project = {
      name: '未命名專案'
    };
    $scope.provisions = [];
    $scope.pos = 0;
    $scope.pages = ['basic', 'provisions', 'detail'];
    $scope.selectedPage = $scope.pages[0];

    $scope.$watch('pos', () => {
      $scope.selectedPage = $scope.pages[$scope.pos];
    });

    $scope.addProvision = () => {
      let provision = {
        shippedQuantity: 0,
        promisedQuantity: 0
      };

      let uploader = new FileUploader({
        scope: provision,
        url: '/api/containers/photos/upload',
        formData: {
          key: 'value'
        }
      });

      uploader.onAfterAddingFile = item => {
        console.info('After adding a file', item);
        item.upload();
      };

      uploader.onCompleteItem = (item, response) => {
        let file = response.result.files.file[0];
        let {container, name} = file;
        let photo = `/api/containers/${container}/download/${name}`;
        this.scope.photos = [photo];
      };

      provision.uploader = uploader;
      $scope.provisions.push(provision);
    };

    $scope.checkMap = () => {
      let address = [$scope.project.city, $scope.project.district,
        $scope.project.detailAddress].join('');
      if (address.length !== 0) {
        addressResolver(address).then(data => {
          let location = data.results[0].geometry.location;
          $scope.project.latitude = location.lat;
          $scope.project.longitude = location.lng;
          $scope.$emit('address', data);
        });
      }
    };

    $scope.create = () => {
      async.series([
        callback => {
          Supporter.getCurrent().$promise.then(user => {
            $scope.user = user;
            callback();
          });
        },
        callback => {
          Supporter.projects.create({id: $scope.user.id}, $scope.project)
          .$promise.then(project => {
            $scope.project = project;
            callback();
          });
        },
        callback => {
          let tasks = $scope.provisions.map(p => {
            delete p.uploader;
            return callback => {
              Project.provisions.create({id: $scope.project.id}, p)
              .$promise.then(() => callback());
            };
          });
          async.series(tasks, () => callback());
        }
      ], () => $state.go('project', {id: $scope.project.id}));
    };

    $scope.addProvision();
  };

  app.controller('CreateController', controller);
})();
