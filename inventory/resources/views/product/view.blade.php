@extends('layouts.home')

@section('content')

<script type="text/javascript" src="/js/moment.min.js"></script>

<script type="text/javascript">

  function createdFormatter(value, row, index) {

      return [ moment(row['created_at']).format('Do MMM YYYY, h:mm A') ];
      
  }

  function actionFormatter(value, row, index) {

      // <a href="/product/show/'+row['id']+'" data-toggle="tooltip" title="View"> <i class="fa fa-eye"></i> </a> &nbsp;&nbsp;
      
      return [ '<a href="/product/edit/'+row['id']+'" data-toggle="tooltip" title="Edit"> <i class="fa fa-pencil"></i> </a> &nbsp;&nbsp;<a href="/product/destroy/'+row['id']+'" data-toggle="tooltip" title="Delete"><i class="fa fa-times"></i></a>' ];

  }

</script>

<section class="content-header">
  <h1>
    <small></small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Add Product</li>
  </ol>
</section>

<!-- Main content -->
    <section class="content">

    @if(Session::has('message'))
    <div class="row">'
    <div class="col-xs-12">
      <div class="alert @if(Session::get('messageType') == 1) alert-success @else alert-danger @endif">
        {{ Session::get('message') }}
      </div>
    </div>
    </div>
    @endif

      <div class="row">
        <div class="col-xs-12">
          <div class="box box-info">
          <div class="box-header with-bproduct">
            <h3 class="box-title">View Products</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                <i class="fa fa-times"></i></button>
            </div>
          </div>
          <div class="box-body">

            <div class="row" style="width:99%;margin-left:5px">
                      <div class="col-xs-12">
                        <table id="table" class="table table-responsive" 
                               data-toggle="table"
                               data-advanced-search="true"
                               data-id-table="advancedTable" 
                               data-url="{{ url('/product/index') }}"
                               data-pagination="true"
                               data-side-pagination="server"
                               data-page-list="[10, 20, 30 , 40 , 50, 100, 200]"
                               data-search="true"
                               data-show-refresh="true"
                               data-show-toggle="true"
                               data-show-columns="true"
                               data-sort-name="id"
                               data-sort-order="desc">
                            <thead>
                            <tr>
                                <th data-field="id" data-align="center" data-sortable="true">Product ID</th>
                                <th data-field="sku" data-align="center" data-sortable="true">SKU</th>
                                <th data-field="code" data-align="center" data-sortable="true">Code</th>
                                <th data-field="description" data-align="center" data-sortable="true">Title</th>
                                <th data-field="classification_id" data-align="center" data-sortable="true">Classification</th>
                                <th data-field="supplier_id" data-align="center" data-sortable="true">Supplier</th>
                                <th data-field="selling_price" data-align="center" data-sortable="true">Selling Price</th>
                                <th data-align="center" data-formatter="actionFormatter" data-events="actionEvents" width="200px"> Action </th>
                            </tr>
                            </thead>
                        </table>
                      </div>
            </div>

          </div> 
          </div>
          <!-- /.box-body -->
          </div>
        </div>  
      </div>  
    </section>
    <!-- /.content -->
@endsection
