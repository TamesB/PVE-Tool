from django.db import models
# Create your models here.
class CommentStatus(models.Model):
    status = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.status}"

# Sets an initial status or extra text/attachment to the pve rule (for example specific to the project)
class PVEItemStatus(models.Model):
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE, default=None)
    item = models.ForeignKey('pve.PVEItem', on_delete=models.CASCADE, default=None)
    aanvulling = models.TextField(max_length=1000, default=None, null=True)
    status = models.ForeignKey(CommentStatus, on_delete=models.CASCADE, default=None, null=True)
    gebruiker = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, default=None, null=True)
    datum = models.DateTimeField(auto_now=True)
    kostenConsequenties = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=None)

    def get_upload_path(instance, filename):
        return '{0}/uploads/project-{1}/OpmerkingBijlages/{2}'.format(settings.MEDIA_ROOT, project.id, filename)

    bijlage = models.FileField(blank=True, null=True, upload_to=get_upload_path)
    init_accepted = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return f"{self.annotation}"

# Sets the phase of the ping-pong process. Which items have changed / accepted / still todo
class CommentPhase(models.Model):
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE, null=True)
    level = models.IntegerField(default=1, blank=True, null=True)
    changed_items = models.ManyToManyField(PVEItemStatus)
    accepted_items = models.ManyToManyField(PVEItemStatus, related_name="accepted_items")
    todo_items = models.ManyToManyField(PVEItemStatus, related_name="todo_items")
    
    def __str__(self):
        return f"Level: {self.level}, Project: {self.project}"

# places a comment on the initial itemstatus, allocates it to a specific commentphase (records it all)
class CommentReply(models.Model):
    commentphase = models.ForeignKey(CommentPhase, on_delete=models.CASCADE, null=True)
    onItem = models.ForeignKey(PVEItemStatus, on_delete=models.CASCADE, null=True)
    comment = models.TextField(max_length=1000, default=None, null=True)
    accept = models.BooleanField(default=False, blank=True, null=True)
    kostenConsequenties = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=None)
    status = models.ForeignKey(CommentStatus, on_delete=models.CASCADE, null=True, blank=True)
    gebruiker = models.ForeignKey('accounts.CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    datum = models.DateTimeField(auto_now=True)

    def get_upload_path(instance, filename):
        return '{0}/uploads/project-{1}/OpmerkingBijlages/{2}'.format(settings.MEDIA_ROOT, commentphase.project.id, filename)

    bijlage = models.FileField(blank=True, null=True, upload_to=get_upload_path)