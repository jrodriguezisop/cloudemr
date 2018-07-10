<template>
<div style="margin-top:10vw">
      
          <v-card>
            <template slot="header">
              <h5 class="title">{{tableTittle}}</h5> 
              <p class="category">{{tableCategory}}</p>
            </template>
              <div class="table-full-width table-responsive">
                <n-table :data="taskData">
                  <template slot-scope="{row}">
                    <td>
                      <checkbox v-model="row.done"></checkbox>
                    </td>
                    <td class="img-row">
                      <div class="img-wrapper img-raised">
                        <img :src="row.url" class="img-raised">
                      </div>
                    </td>
                    <td class="text-left">
                      {{row.message}}
                    </td>
                    <td class="td-actions text-right">
                      <button type="button" rel="tooltip" title=""
                          class="btn btn-info btn-round btn-icon btn-icon-mini btn-neutral"
                          data-original-title="Edit Task">
                        <i class="now-ui-icons ui-2_settings-90"></i>
                      </button>
                      <button type="button" rel="tooltip" title=""
                          class="btn btn-danger btn-round btn-icon btn-icon-mini btn-neutral"
                          data-original-title="Remove">
                        <i class="now-ui-icons ui-1_simple-remove"></i>
                      </button>
                    </td>
                  </template>
                </n-table>
              </div>

            <template slot="footer">
              <hr>
              <i class="now-ui-icons loader_refresh spin"></i> {{timeUpdate}}
            </template>
          </v-card>
      
      <v-layo xs6>
        <v-card>
          <time-line type="simple">
            <time-line-item inverted
                          badge-icon="now-ui-icons objects_planet"
                          badge-type="danger">
              <span slot="header" class="badge badge-danger">{{timeLineData[0].titulo}}</span>
              <template slot="content">
                <p>{{timeLineData[0].mensaje}}</p>
              </template>
              <span slot="footer">
                {{timeLineData[0].via}}
              </span>
              <span slot="footer">
                <!-- <drop-down>
                   <n-button slot="title" type="info" round class="dropdown-toggle">
                      <i class="now-ui-icons design_bullet-list-67"></i>
                    </n-button>
                  <a class="dropdown-item" href="#">{{timeLineData[3].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[4].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[5].accion}}</a>
                </drop-down> -->
              </span>
            </time-line-item>
            <time-line-item inverted
                          badge-icon="now-ui-icons shopping_tag-content"
                          badge-type="success">
              <span slot="header" class="badge badge-success">{{timeLineData[1].titulo}}</span>
              <template slot="content">
                <p>{{timeLineData[1].mensaje}}</p>
              </template>
              <span slot="footer">
                <!-- <drop-down>
                   <n-button slot="title" type="info" round class="dropdown-toggle">
                      <i class="now-ui-icons design_bullet-list-67"></i>
                    </n-button>
                  <a class="dropdown-item" href="#">{{timeLineData[3].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[4].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[5].accion}}</a>
                </drop-down> -->
              </span>
            </time-line-item>
            <time-line-item inverted
                          badge-icon="now-ui-icons shopping_delivery-fast"
                          badge-type="info">
              <span slot="header" class="badge badge-info">{{timeLineData[2].titulo}}</span>
              <template slot="content">
                <p>{{timeLineData[2].mensaje}}</p>
                <p>{{timeLineData[2].mensajeDos}}</p>
              </template>
              <span slot="footer">
                <!-- <drop-down>
                   <n-button slot="title" type="info" round class="dropdown-toggle">
                      <i class="now-ui-icons design_bullet-list-67"></i>
                    </n-button>
                  <a class="dropdown-item" href="#">{{timeLineData[3].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[4].accion}}</a>
                  <a class="dropdown-item" href="#">{{timeLineData[5].accion}}</a>
                </drop-down> -->
              </span>
            </time-line-item>
          </time-line>
        </v-card>
        
    </div>
    
</template>
<script>
export default {}
</script>