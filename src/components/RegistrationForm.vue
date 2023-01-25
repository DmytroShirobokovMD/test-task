<template>
    <v-container fluid class="registration-wrap p-12 d-flex justify-center align-center">
        <v-card
            elevation="3"
        >
            <v-form
                ref="form"
                v-model="valid"
                class="form text-center px-12 py-8"
            >
                <p class="text-start ml-2 mb-2">Full name</p>
                <v-text-field
                    class="rounded-xl"
                    v-model="userData.name"
                    :rules="[v => !!v || 'Field is required']"
                    outlined
                    dense
                    required
                ></v-text-field>

                <p class="text-start ml-2 mb-2">Country</p>
                <v-autocomplete
                    class="rounded-xl"
                    v-model="userData.country"
                    :items="countries"
                    :rules="[v => !!v || 'Field is required']"
                    item-text="name"
                    return-object
                    outlined
                    dense
                >
                    <template v-slot:selection="slotProps">
                        <country-flag class="mr-1" size='small' :country="encodeFlag(slotProps.item.name)" />
                        {{ slotProps.item.name }}
                    </template>
                    <template v-slot:item="slotProps">
                        <country-flag class="mr-1" :country='encodeFlag(slotProps.item.name)' size='small'/>
                        {{ slotProps.item.name }}
                    </template>
                </v-autocomplete>

                <p class="text-start ml-2 mb-2">Phone</p>
                <v-text-field
                    class="rounded-xl"
                    v-model="userData.phone"
                    v-mask="'## ###-##-##'"
                    :rules="[v => !!v || 'Field is required']"
                    outlined
                    dense
                >
                <span
                    slot="prepend-inner"
                    class="mt-1"
                >
                    {{ userData.country?.idd }}
                </span>
                </v-text-field>

                <p class="text-start ml-2 mb-2">Email</p>
                <v-text-field
                    class="rounded-xl"
                    v-model="userData.email"
                    :rules="[v => !!v || 'Field is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                    outlined
                    dense
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    class="text-center"
                    elevation="1"
                    @click="onSubmit"
                >
                    Submit
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import countries from "@/data/countries.json"

import api from '../api'
import CountryFlag from 'vue-country-flag'
const lookup = require('country-code-lookup')
export default {
    name: "RegistrationForm",
    components: {
        CountryFlag,
    },
    data() {
        return {
            countries,
            valid: true,
            userData: {
                country: null,
                name: null,
                phone: null,
                email: null,
            },
        }
    },
    computed: {
        flag() {
            return this.userData.country
                ? this.encodeFlag(this.userData.country.flag)
                : ''
        },
    },
    methods: {
        encodeFlag(p) {
            const country = lookup.byCountry(p)
            return country ? country.iso2 : ''
        },
        async onSubmit() {
            const data = {
                email: this.userData.email,
                name: this.userData.name,
                country: this.userData.country.name,
                phone_number: Number(this.userData.phone.replace(/\D/g, ''))
            }

            try {
                api.post('', data).then(response => {
                    console.log(response)
                    this.$toast.success("Success toast");
                })
            } catch (error) {
                this.$toast.error(error);
                console.warn(error)
            }

        },
    },
}
</script>
<style scoped>
.registration-wrap {
    height: 100%;
}
.form {
    width: 100%;
    max-width: 400px;
}
</style>