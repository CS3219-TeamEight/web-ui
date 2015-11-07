import $ from 'jquery';
import Config from 'config';
import Dropzone from 'dropzone';

var renderDropzone = function(view) {
  var resumeAddress = Config.get('Client.restServer.address') + Config.get('Client.restServer.apiRoot') + Config.get('Client.restServer.resumePath');
  var resumeConfig = {
    url: resumeAddress,
    method: 'post',
    maxFilesize: 8,
    clickable: true,
    acceptedFiles: 'application/pdf, application/octet-stream, application/zip'
  };
  var drop = new Dropzone('#resume-dropzone', resumeConfig);

  drop.on('sending', function(file, xhr, formData) {
    formData.append('jobID', view.jobID);
  });

  drop.on('addedfile', function(file) {
    switch (file.type) {
      case 'application/pdf':
        $(file.previewElement).find('.dz-image img').attr('src', Config.get('Client.assets.root') + '/img/pdf-dropzone.png');
        break;
      case 'application/octet-stream':
      case 'application/zip':
        $(file.previewElement).find('.dz-image img').attr('src', Config.get('Client.assets.root') + '/img/zip-dropzone.png');
        break;
    }
  });
};

var resumeDrop = {
  render: renderDropzone
};

export default resumeDrop;
