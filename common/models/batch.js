module.exports = function(Batch) {
  Batch.notify = (batchId, type, cb) => {
    const filter = {
      'include': [
        {'provisionActivities': 'provisionRequirement'},
        'station'
      ]
    };
    Batch.findById(batchId, filter, (err, instance) => {
      if (err) return cb(err);

      var text, subject;
      const contact = instance.toJSON().station._contacts[0];
      const address = `${contact._address.zipCode} ${contact._address.city}${contact._address.district}${contact._address.detail}`;
      const list = instance.toJSON().provisionActivities
        .filter(activity => activity[type] !== undefined && activity[type] > 0)
        .map(activity => '※ ' + activity.provisionRequirement.name + '：' +
                         activity[type] + ' ' +
                         activity.provisionRequirement.unit);

      if (type === 'promised') {
        subject = `您認領了一筆物資 - 編號：${instance.trackingNumber}`;
        text = [
          '▼ 感謝您認領了以下物資：',
          ...list,
          '',
          '▼ 以下為寄件資訊：',
          `※ 地址：${address}`,
          `※ 收件人：${contact.name} (編號：${instance.trackingNumber})`,
          `※ 聯絡電話：${contact.phone}`,
          '',
          '寄送物資時請務必在收件人後標注上您的編號來加速處理速度！'
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
      const from = `物資地圖 <bifrost@${domain}>`;
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
