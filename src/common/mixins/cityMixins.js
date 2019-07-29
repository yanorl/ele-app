import { mapGetters } from 'vuex'

export default{
    computed: {
        city() {
            return this.location.addressComponent.city || this.location.addressComponent.province
        },
        ...mapGetters([
            'location',
            'address'
        ])
    }
}