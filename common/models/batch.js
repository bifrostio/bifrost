module.exports = function(Batch) {
  Batch.notify = (batchId, type, cb) => {
    const filter = {'include': {'provisionActivities': 'provisionRequirement'}};
    Batch.findById(batchId, filter, (err, instance) => {
      if (err) return cb(err);

      var text, subject;
      const list = instance.toJSON().provisionActivities
        .filter(activity => activity[type] !== undefined && activity[type] > 0)
        .map(activity => '* ' + activity.provisionRequirement.name + '：' +
                         activity[type] + ' ' +
                         activity.provisionRequirement.unit);

      if (type === 'promised') {
        subject = `您認領了一筆物資 - 編號：${instance.trackingNumber}`;
        text = [
          '感謝您認領了以下物資：',
          ...list,
          '\n寄送物資時請務必在寄件人處標注上您的編號來加速處理速度！'
        ].join('\n');
      }
      else {
        subject = `物資站接收到了您捐贈的物資 - 編號：${instance.trackingNumber}`;
        text = [
          '物資站接收到了您捐贈的物資：',
          ...list,
          '\n謝謝您的捐贈！'
        ].join('\n');
      }

      const domain = Batch.app.models.Email.getDataSource().settings.domain;
      const from = `No reply <no-reply@${domain}>`;
      const to = instance._contact.email;

      Batch.app.models.Email.send({ to, from, subject, text })
      .then(() => cb())
      .catch(err => cb(err));
    });
  };

  Batch.remoteMethod('notify', {
    accepts: [
      { arg: 'batchId', type: 'string' },
      { arg: 'type', type: 'string'}
    ]
  });
};
