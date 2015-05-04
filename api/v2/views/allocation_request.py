from rest_framework.permissions import IsAuthenticated

from api.v2.views.base import BaseRequestViewSet
from api.v2.serializers.details import AllocationRequestSerializer,\
    UserAllocationRequestSerializer
from core.models import AllocationRequest


class AllocationRequestViewSet(BaseRequestViewSet):
    """
    API endpoint that allows allocation request to be viewed or edited.
    """
    queryset = AllocationRequest.objects.none()
    model = AllocationRequest
    serializer_class = UserAllocationRequestSerializer
    admin_serializer_class = AllocationRequestSerializer
    permission_classes = (IsAuthenticated,)
    filter_fields = ('status__id', 'status__name')

    def submit_action(self, instance):
        """
        Submits an allocation request email
        """

    def approve_action(self, instance):
        """
        Notify the user the request was approved and update the allocation.
        """
        membership = instance.membership
        membership.allocation = instance.allocation
        membership.save()

    def deny_action(self, instance):
        """
        Notify the user that the request was denied
        """
