<template>
  <v-layout align-center justify-center >
    <v-flex xs12 >
      <v-card flat class="card--flex-toolbar" color="transparent">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-container class="mx-0 px-0 my-0 p-y0">
              <slot>
                <v-card>
                  <v-card-title>
                    Empty
                  </v-card-title>
                </v-card>
              </slot>
            </v-container>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

</template>
