@extends('layouts.home')

@section('content')

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

    <div class="row">
        <div class="col-sm-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Add Product</h3>

                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i class="fa fa-minus"></i></button>
                        <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                            <i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <form class="form-horizontal create_product" role="form" method="POST" action="{{ url('/product/store') }}">

                        {{ csrf_field() }}

                        <div class="box-body">

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Code</label><br>
                                        <input type="text" class="form-control" name="code" placeholder="Product Code">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Cost</label>
                                        <input type="text" class="form-control" name="cost" placeholder="0.00">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>SKU</label><br>
                                        <input type="text" class="form-control" name="sku" placeholder="Product SKU">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Retail Price</label>
                                        <input type="text" class="form-control" name="retail_price" placeholder="0.00">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Part Number</label><br>
                                        <input type="text" class="form-control" name="part_number" placeholder="Part Number">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Sale Price</label>
                                        <input type="text" class="form-control" name="sale_price" placeholder="0.00">
                                    </div>
                                </div>

                            </div>
                            
                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Attribute</label><br>
                                        <select class="form-control change_attribute_name" name="attribute_id">
                                            <option selected="" disabled="" value=""> Select </option>
                                            @foreach($attribute_details as $key => $value)
                                            <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Selling Price</label>
                                        <input type="text" class="form-control" name="Selling_price" placeholder="0.00">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Title</label><br>
                                        <input type="text" class="form-control" name="description" placeholder="Product Title">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Weight</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="weight" placeholder="Weight">
                                            <span class="input-group-addon">
                                                <select class="" name="weight_unit">
                                                    <option selected="" disabled="" value=""> Select </option>
                                                    <option value="1">kgs</option>
                                                    <option value="2">lbs</option>
                                                    <option value="3">oz</option>
                                                    <option value="4">g</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Brand</label><br>
                                        <select class="form-control change_brand_name" name="brand_id">
                                            <option selected="" disabled="" value=""> Select </option>
                                            @foreach($brand_details as $key => $value)
                                            <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Maximum Quantity</label>
                                        <input type="text" class="form-control" name="max_qnty" placeholder="Maximum Quantity">
                                    </div>
                                </div>

                            </div>
                            
                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Classification</label><br>
                                        <select class="form-control change_brand_name" name="classification_id">
                                            <option selected="" disabled="" value=""> Select </option>
                                            @foreach($classification_details as $key => $value)
                                            <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Minimum Quantity</label>
                                        <input type="text" class="form-control" name="min_qnty" placeholder="Minimum Quantity">
                                    </div>
                                </div>

                            </div>
                            
                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Supplier Name</label><br>
                                        <select class="form-control change_supplier_name" name="supplier_id">
                                            <option selected="" disabled="" value=""> Select </option>
                                            @foreach($supplier_details as $key => $value)
                                            <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                        <input type="hidden" name="supplier_name" class="supplier_name">
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Reorder Point</label>
                                        <input type="text" class="form-control" name="reorder_point" placeholder="0">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Status</label><br>
                                        <select class="form-control change_status_name" name="status_id">
                                            <option selected="" disabled="" value=""> Select </option>
                                            @foreach($status_details as $key => $value)
                                            <option value="{{ $key }}">{{ $value }}</option>
                                            @endforeach
                                        </select>
                                        <input type="hidden" name="status_name" class="status_name">
                                    </div>
                                </div>
                                
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Note</label>
                                        <textarea class="form-control" rows="3" name="note" placeholder="Enter ..."></textarea>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <!-- /.box-body -->

                        <div class="box-footer">
                            <button type="reset" class="btn btn-danger pull-left">Reset</button>
                            <button type="submit" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Add</button>
                        </div>
                    </form>
                </div>
                <!-- /.box-body -->
            </div>
        </div>  
    </div>  
</section>
<!-- /.content -->
@endsection
