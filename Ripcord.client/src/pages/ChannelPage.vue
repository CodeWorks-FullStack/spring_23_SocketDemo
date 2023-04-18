<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <ChannelList />
      <!-- SECTION FRIENDS/ROOMS LIST -->
      <FriendRoomList />
      <!-- SECTION CHAT -->
      <ChatRoom />
      <!-- SECTION WHO'S ONLINE -->
      <WhoIsOnline />
    </div>
  </section>

  <Modal id="editChannel">
    <template #header>
      <div>Edit Channel</div>
    </template>

    <template #body>
      <ChannelForm />
    </template>
  </Modal>

  <Modal id="createRoom">
    <template #header>
      <div>Create Room</div>
    </template>

    <template #body>
      <RoomForm />
    </template>
  </Modal>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { AppState } from "../AppState";
import FriendRoomList from "../components/HomePage/FriendRoomList.vue";
import ChannelList from "../components/HomePage/ChannelList.vue"
import ChatRoom from "../components/HomePage/ChatRoom.vue"
import WhoIsOnline from "../components/HomePage/WhoIsOnline.vue";
import Modal from "../components/Util/Modal.vue";
import ChannelForm from "../components/Forms/ChannelForm.vue";
import RoomForm from "../components/Forms/RoomForm.vue";
import { useRoute, useRouter } from "vue-router";
import { roomsService } from "../services/RoomsService";
import { socketService } from "../services/SocketService"

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    watchEffect(() => {
      route.params.id
      // joinRoom()
      getMessages()
      getChannel()
      getChannels()
    })

    // router.beforeEach((to, from) => {
    //   if (from.name == "Channel") {
    //     leaveRoom(from.params.id)
    //   }
    //   logger.log('TO:', to.params.id)
    //   logger.log('FROM:', from)
    // })
    // function joinRoom() {
    //   try {
    //     // SENDING MESSAGE TO SERVER
    //     let payload = { roomName: route.params.id }
    //     socketService.emit('joining:room', payload)
    //   } catch (error) {
    //     logger.error('[ERROR]', error)
    //     Pop.error(('[ERROR]'), error.message)
    //   }
    // }

    // function leaveRoom(id) {
    //   try {
    //     let payload = { roomName: id }
    //     socketService.emit('leaving:room', payload)
    //   } catch (error) {
    //     logger.error('[ERROR]', error)
    //     Pop.error(('[ERROR]'), error.message)
    //   }
    // }

    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    async function getChannel() {
      try {
        const channelId = route.params.id
        await channelsService.setActiveChannel(channelId)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getMessages() {
      try {
        let roomId = route.params.id
        await roomsService.getMessages(roomId)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    return {
    };
  },
  components: { FriendRoomList, ChannelList, ChatRoom, WhoIsOnline, Modal, ChannelForm, RoomForm }
}
</script>

<style scoped lang="scss">
.bigHeight {
  height: 100dvh;
}
</style>
