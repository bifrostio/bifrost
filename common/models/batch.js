module.exports = function(Batch) {
  Batch.notify = (batchId, cb) => {
    const filter = {'include': {'provisionActivities': 'provisionRequirement'}};
    Batch.findById(batchId, filter, (err, instance) => {
      if (err) return cb(err);

      const list = instance.toJSON().provisionActivities
        .filter(activity => activity.promised !== 0)
        .map(activity => '* ' + activity.provisionRequirement.name + '：' +
                         activity.promised + ' ' +
                         activity.provisionRequirement.unit);
      const text = [
        '感謝您認領了以下物資：',
        ...list,
        '\n寄送物資時請務必在寄件人處標注上您的編號來加速處理速度！'
      ].join('\n');
      const subject = `您認領了一筆物資 - 編號：${instance.trackingNumber}`;
      const domain = Batch.app.models.Email.getDataSource().settings.domain;
      const from = `No reply <no-reply@${domain}>`;
      const to = instance._contact.email;

      Batch.app.models.Email.send({ to, from, subject, text })
      .then(() => cb())
      .catch(err => cb(err));
    });
  };

  Batch.remoteMethod('notify', {
    accepts: { arg: 'batchId', type: 'string' }
  });
};
