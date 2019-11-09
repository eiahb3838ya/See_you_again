from django.db import models

# Create your models here.


class Contract (models.Model):
    contractHash = models.CharField(max_length=50, primary_key=True)

    idNum = models.ForeignKey(
        'userAccount.Profile',
        on_delete=models.CASCADE,
    )
    encryptedContext = models.BinaryField()
    reveal = models.BooleanField(default=False)

    last_modify_date = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "contract"


class ContractRelatives (models.Model):
    contractHash = models.ForeignKey(Contract, on_delete=models.CASCADE)

    idNum = models.ForeignKey(
        'userAccount.Profile',
        on_delete=models.CASCADE,
    )

    class Meta:
        db_table = "contract_relatives"
