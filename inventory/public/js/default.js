$( document ).ready(function() {

    $( ".search_supplier_name" ).on('keyup',function(){
        $(".search_supplier_name_empty").hide();
    });

    $(document).on('click', '.add_sales_product', function(){

        $('.sales_container').append('<tr><td><input type="text" class="form-control search_purchase_category_name" placeholder="Type here ..." name="category_name[]" autocomplete="off"><span class="help-block search_purchase_category_name_empty glyphicon" style="display: none;"> No Results Found </span><input type="hidden" class="search_category_id" name="category_id[]"></td><td width="250px"><select class="form-control stock_id" name="stock_id[]"><option selected="" disabled="" value="">select</option></select><span class="search_stock_quantity"></span></td><td width="200px"><input type="text" class="form-control search_purchase_cost" name="purchase_cost[]" readonly=""></td><td width="150px"><input type="text" class="form-control search_selling_cost" name="selling_cost[]" ></td><td width="50px"><input type="hidden" class="search_stock_quantity" name="opening_stock[]"><input type="hidden" name="closing_stock[]" class="closing_stock"><input type="number" class="form-control change_sales_quantity" name="sales_quantity[]" min="1"><small class="help-block max_stock" style="display: none;">Insufficient Stock</small></td><td width="100px"><input type="text" class="form-control stock_total" name="sub_total[]" readonly=""></td><td><button type="button" class="btn btn-danger remove_tr">&times;</button></td></tr>');

        $( ".search_purchase_category_name" ).autocomplete({
          source: "/search/purchase_category_name",
          minLength: 1,
          response: function(event, ui) {
                if (ui.content.length === 0) {

                    $(this).parent().addClass('has-error');
                    $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $(this).next().show();
                    $('.form_submit').hide();

                } else {
                    $(this).next().hide();
                    $('.form_submit').show();
                }
            },
          select: function(event, ui) {

            $(this).next().next().val(ui.item.id);

            var select = $(this).parent().next().children(':first-child');

            select.empty().append('<option selected="" disabled="" value="">- Select -</option>');

            $.each( ui.item.stocks , function( key, value ) {
                select.append('<option title="'+value.title+'" purchase_cost="'+value.purchase_cost+'" selling_cost="'+value.selling_cost+'" opening_stock="'+value.opening_stock+'" value='+key+'>'+value.dimention+'</option>');
            });

          }
        });

        calculate_sales();
    });

    $(document).on('click', '.add_purchase_product', function(){

        $('.purchase_container').append('<tr><td><input type="text" class="form-control search_purchase_category_name" placeholder="Type here ..." name="category_name[]" autocomplete="off"><span class="help-block search_purchase_category_name_empty" style="display: none;">No Results Found ...</span><input type="hidden" class="search_category_id" name="category_id[]"></td><td width="250px"><select class="form-control purchase_stock_id" name="stock_id[]"><option selected="" disabled="" value="">select</option></select><span></span></td><td width="150px"><input type="hidden" class="search_stock_quantity" name="opening_stock[]"><input type="hidden" class="closing_stock" name="closing_stock[]"><input type="text" class="form-control change_purchase_quantity" name="purchase_quantity[]" min="0" autocomplete="off"></td><td width="200px"><input type="text" class="form-control search_purchase_cost" name="purchase_cost[]"></td><td width="150px"><input type="text" class="form-control stock_total" name="sub_total[]"  readonly=""></td><td><button type="button" class="btn btn-danger remove_tr">&times;</button></td></tr>');

        $( ".search_purchase_category_name" ).autocomplete({
          source: "/search/purchase_category_name",
          minLength: 1,
          response: function(event, ui) {
                if (ui.content.length === 0) {

                    $(this).parent().addClass('has-error');
                    $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $(this).next().show();
                    $('.form_submit').hide();

                } else {
                    $(this).next().hide();
                    $('.form_submit').show();
                }
            },
          select: function(event, ui) {

            $(this).next().next().val(ui.item.id);

            var select = $(this).parent().next().children(':first-child');

            select.empty().append('<option selected="" disabled="" value="">- Select -</option>');

            $.each( ui.item.stocks , function( key, value ) {
                select.append('<option title="'+value.title+'" purchase_cost="'+value.purchase_cost+'" selling_cost="'+value.selling_cost+'" opening_stock="'+value.opening_stock+'" value='+key+'>'+value.dimention+'</option>');
            });

          }
        });

        calculate_purchase();
    });

    

    $( ".search_product_sku" ).on('keyup',function(){
        $(".search_product_sku_empty").hide();
    });
    

    $( ".search_product_sku" ).autocomplete({
        source: "/search/product_sku",
        minLength: 1,
        response: function(event, ui) {
              if (ui.content.length === 0) {
  
                  $(this).parent().addClass('has-error');
                  $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                  $(".search_product_sku_empty").show();
                  $('.form_submit').hide();
  
              } else {
                  $(".search_product_sku_empty").hide();
                  $('.form_submit').show();
              }
          },
        select: function(event, ui) {

          $('.search_product_id').val(ui.item.id);
          $('.search_product_sku').val(ui.item.value);
          $('.search_product_name').val(ui.item.description);
  
          // var e = $.Event('keyup'); $('.change_purchase_quantity,.sales_payment,.stock_id').trigger(e);
        }
    });

    $(document).on('click', '.add_kit_product', function(){

        $('.product_container').append('<tr><td><input type="text" class="form-control search_product_sku" placeholder="Type here ..." name="product_sku[]" autocomplete="off"><span class="help-block search_product_sku_empty" style="display: none;">No Results Found ...</span><input type="hidden" class="search_product_id" name="product_id[]"></td><td width="250px"><input type="text" class="form-control search_product_name" placeholder="Type here ..." name="product_name[]" autocomplete="off"><span></span></td><td width="150px"><input type="text" class="form-control change_product_quantity" name="product_quantity[]" min="0" autocomplete="off"></td><td><button type="button" class="btn btn-danger remove_tr">&times;</button></td></tr>');

        $( ".search_product_sku" ).autocomplete({
        source: "/search/product_sku",
        minLength: 1,
        response: function(event, ui) {
                if (ui.content.length === 0) {
                    $(this).parent().addClass('has-error');
                    $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $(this).next().show();
                    $('.form_submit').hide();
    
                } else {
                    $(this).next().hide();
                    $('.form_submit').show();
                }
            },
        select: function(event, ui) {
            $(this).next().next().val(ui.item.id);
            $(this).next().val(ui.item.value);
            $(this).parent().next().children(':first-child').val(ui.item.description);

  
  // var e = $.Event('keyup'); $('.change_purchase_quantity,.sales_payment,.stock_id').trigger(e);
        }
        });
  

    });

    $(document).on('click', '.search_item_product', function(){

        $('.item_container').append('<table id="table" class="table table-responsive" data-toggle="table" data-url="{{ url(\'/item/get_product\') }}\" data-pagination="true" data-side-pagination="server" data-page-list="[10, 20, 30 , 40 , 50, 100, 200]" data-search="true" data-show-refresh="true" data-show-toggle="true" data-sort-name="id" data-sort-order="desc"><thead><tr><th data-field="code" data-align="center" data-sortable="true">Product Code</th><th data-field="sku" data-align="center" data-sortable="true">Product Sku</th><th data-field="description" data-align="center" data-sortable="true">Product Title</th><th data-field="part_number" data-align="center" data-sortable="true">Part Number</th><th data-field="quantity" data-align="center" data-sortable="true">Quantity</th><th data-align="center" data-formatter="actionFormatter" data-events="actionEvents" width="200px">Action</th></tr></thead></table>');

        $( ".search_product_sku" ).autocomplete({
        source: "/search/product_sku",
        minLength: 1,
        response: function(event, ui) {
                if (ui.content.length === 0) {
                    $(this).parent().addClass('has-error');
                    $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $(this).next().show();
                    $('.form_submit').hide();
    
                } else {
                    $(this).next().hide();
                    $('.form_submit').show();
                }
            },
        select: function(event, ui) {
            $(this).next().next().val(ui.item.id);
            $(this).next().val(ui.item.value);
            $(this).parent().next().children(':first-child').val(ui.item.description);

  
  // var e = $.Event('keyup'); $('.change_purchase_quantity,.sales_payment,.stock_id').trigger(e);
        }
        });
  

    });

    $(document).on('click', '.remove_tr', function(){
        $(this).closest('tr').remove();
        calculate_sales();
    });

    $(document).on('change','.stock_id',function(){

        $(this).parent().next().children(':first-child').val($(this).find(':selected').attr('purchase_cost'));

        $(this).parent().next().next().children(':first-child').val($(this).find(':selected').attr('selling_cost'));

        $(this).parent().next().next().next().find(':nth-child(1)').val($(this).find(':selected').attr('opening_stock'));

        $(this).parent().next().next().next().find(':nth-child(3)').attr('max',$(this).find(':selected').attr('opening_stock'));

        $(this).next().html('Available Stocks : '+$(this).find(':selected').attr('opening_stock'));

        calculate_sales();

    });

    $(document).on('change','.purchase_stock_id',function(){

        var purchase_cost = $(this).find(':selected').attr('purchase_cost');
        var opening_stock = $(this).find(':selected').attr('opening_stock');

        $(this).next().html('Available Stocks : '+$(this).find(':selected').attr('opening_stock'));

        $(this).parent().next().children(':first-child').val(opening_stock);

        $(this).parent().next().next().children(':first-child').val(purchase_cost);

        $(this).parent().next().next().next().find(':nth-child(1)').val();

        calculate_purchase();

    });

    $(document).on('keyup','.change_sales_quantity',function(){

        if(  parseInt( $(this).val() ) >  parseInt( $(this).attr('max') ) ){
            $(this).parent().addClass('has-error');
            $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
            $('.form_submit,.add_sales_product').hide();
            $('.max_stock').show();
        }else{
            $(this).parent().removeClass('has-error');
            $('.form_submit,.add_sales_product').show();
            $('.max_stock').hide();
        }

        var quantity = parseFloat($(this).val()).toFixed(2);

        var cost = parseFloat( $(this).parent().prev().children(':first-child').val() ).toFixed(2);

        var total = parseFloat(quantity*cost || 0).toFixed(2);

        $(this).parent().next().children(':first-child').val(total);

        var opening = parseInt( $(this).prev().prev().val() );

        $(this).prev().val( parseInt(opening - quantity) );

        calculate_sales();
        
    });

    $(document).on('keyup','.change_purchase_quantity',function(){

        var quantity = parseInt($(this).val()).toFixed(2);

        var cost = parseFloat( $(this).parent().next().children(':first-child').val() ).toFixed(2);

        var total = parseFloat(quantity*cost || 0).toFixed(2);

        $(this).parent().next().next().children(':first-child').val(total);

        var opening = parseInt( $(this).prev().prev().val() );

        $(this).prev().val( parseInt(opening) + parseInt(quantity) );

        calculate_purchase();
        
    });

    $(document).on('keyup','.search_selling_cost',function(){

        var quantity = parseFloat( $(this).parent().next().find(':nth-child(3)').val() ).toFixed(2);

        var cost = parseFloat( $(this).val() ).toFixed(2);

        var total = parseFloat(quantity*cost || 0).toFixed(2);

        $(this).parent().next().next().children(':first-child').val(total);

        calculate_sales();
        
    });

    $('.sales_discount_percent').on('keyup',function(){

        var discount_percent = parseFloat( $(this).val() || 0).toFixed(2); 
        var sub_total = parseFloat($('.sales_total').val()).toFixed(2);
        var tax = parseFloat($('.sales_tax_amount').val()).toFixed(2);
        var discount = parseFloat( (sub_total * discount_percent)/100 ).toFixed(2);

        $('.sales_discount_amount').val(discount || 0);

        calculate_sales();

    });

    $('.sales_discount_amount').on('keyup',function(){

        var discount = parseFloat($(this).val() || 0).toFixed(2); 
        var sub_total = parseFloat($('.sales_total').val() || 0).toFixed(2);
        var tax = parseFloat($('.sales_tax_amount').val() || 0).toFixed(2);
        var discount_percent = ((discount*100)/sub_total || 0).toFixed(2);

        $('.sales_discount_percent').val(discount_percent || 0);

        calculate_sales();

    });

    $('.sales_tax_percent').on('keyup',function(){

        var tax_percent = parseFloat($(this).val() || 0).toFixed(2); 
        var sub_total = parseFloat($('.sales_total').val() || 0).toFixed(2);
        var discount = parseFloat($('.sales_discount_amount').val() || 0).toFixed(2);

        var tax = parseFloat( (sub_total * tax_percent)/100 || 0 ).toFixed(2);

        $('.sales_tax_amount').val(tax || 0);

        calculate_sales();
    });

    $('.sales_tax_amount').on('keyup',function(){

        var tax = parseFloat($(this).val() || 0).toFixed(2); 
        var sub_total = parseFloat($('.sales_total').val() || 0).toFixed(2);
        var discount = parseFloat($('.sales_discount_amount').val() || 0).toFixed(2);

        var tax_percent = ((tax*100)/sub_total || 0).toFixed(2);

        $('.sales_tax_percent').val(tax_percent || 0);

        calculate_sales();

    });

    function calculate_sales() {
        
        var sum = 0;
        
        $(".stock_total").each(function(){
            sum += +$(this).val();
        });

        $('.sales_total').val(sum);

        var total = (parseFloat($('.opening_due').val()) + parseFloat($('.sales_total').val()) - parseFloat($('.opening_balance').val())).toFixed(2);

        var discount = parseFloat( $('.sales_discount_amount').val() ).toFixed(2);

        var tax = parseFloat( $('.sales_tax_amount').val() ).toFixed(2);

        var grand = (parseFloat(total-discount) + parseFloat(tax)).toFixed(2);

        $('.grand_total').val( grand || '');

    }

    $('.purchase_discount_percent').on('keyup',function(){

        var discount_percent = parseFloat($(this).val()).toFixed(2); 
        var sub_total = parseFloat($('.purchase_total').val()).toFixed(2);
        var tax = parseFloat($('.purchase_tax_amount').val()).toFixed(2);
        var discount = parseFloat( (sub_total * discount_percent)/100 ).toFixed(2);

        $('.purchase_discount_amount').val(discount || 0);

        calculate_purchase();

    });

    $('.purchase_discount_amount').on('keyup',function(){

        var discount = parseFloat( $(this).val() ).toFixed(2); 
        var sub_total = parseFloat($('.purchase_total').val()).toFixed(2);
        var tax = parseFloat( $('.purchase_tax_amount').val() ).toFixed(2);

        var discount_percent = ((discount*100)/sub_total).toFixed(2);

        $('.purchase_discount_percent').val(discount_percent || 0);

        calculate_purchase();

    });

    $('.purchase_tax_percent').on('keyup',function(){

        var tax_percent = parseFloat($(this).val()).toFixed(2); 
        var sub_total = parseFloat($('.purchase_total').val()).toFixed(2);
        var discount = parseFloat($('.purchase_discount_amount').val()).toFixed(2);

        var tax = parseFloat( (sub_total * tax_percent)/100 ).toFixed(2);

        $('.purchase_tax_amount').val(tax || 0);

        calculate_purchase();
    });

    $('.purchase_tax_amount').on('keyup',function(){

        var tax = parseFloat($(this).val()).toFixed(2); 
        var sub_total = parseFloat($('.purchase_total').val()).toFixed(2);
        var discount = parseFloat($('.purchase_discount_amount').val()).toFixed(2);

        var tax_percent = ((tax*100)/sub_total).toFixed(2);

        $('.purchase_tax_percent').val(tax_percent || 0);

        calculate_purchase();

    });

    function calculate_purchase() {
        
        var sum = 0;
        
        $(".stock_total").each(function(){
            sum += +$(this).val();
        });

        $('.purchase_total').val(sum);

        var total = (parseFloat($('.opening_due').val()) + parseFloat($('.purchase_total').val()) - parseFloat($('.opening_balance').val())).toFixed(2);

        var discount = parseFloat( $('.purchase_discount_amount').val() ).toFixed(2);

        var tax = parseFloat( $('.purchase_tax_amount').val() ).toFixed(2);

        var grand = (parseFloat(total-discount) + parseFloat(tax)).toFixed(2);

        $('.grand_total').val( grand || '');

    }

    $('.change_supplier_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.supplier_name').val('');
        }
        else{
            $('.supplier_name').val($(this).find(':selected').text());    
        }
         
    });
    
    $('.change_status_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.status_name').val('');
        }
        else{
            $('.status_name').val($(this).find(':selected').text());    
        }
         
    });

    $('.change_warehouse_name').on('change',function(){
        
        if($(this).find(':selected').val() == 0){
            $('.warehouse_name').val('');
        }
        else{
  // window.alert($location_details);
            $('.warehouse_name').val($(this).find(':selected').text()); 
         }
         
    });

    $('.change_location_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.location_name').val('');
        }
        else{
            $('.location_name').val($(this).find(':selected').text());    
        }
         
    });
    
    $('.change_attribute_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.attribute_name').val('');
        }
        else{
            $('.attribute_name').val($(this).find(':selected').text());    
        }
         
    });
    
    $('.change_brand_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.brand_name').val('');
        }
        else{
            $('.brand_name').val($(this).find(':selected').text());    
        }
         
    });

    
    $('.change_classification_name').on('change',function(){

        if($(this).find(':selected').val() == 0){
            $('.classification_name').val('');
        }
        else{
            $('.classification_name').val($(this).find(':selected').text());    
        }
         
    });

    $('.inline_report_type').on('change',function(){
        $('.generate_report_inline').submit();
         
    });

    $('.inline_datepicker_from,.inline_datepicker_to').datepicker({
        onSelect: function(date) {
            $('.generate_report_inline').submit();
        }
    });

    $('.measures_check').on('click',function(){
        
        sub_div = '.measure_id_'+$(this).val();
        sub_input = '.measure_unit_'+$(this).val();

        if($(this).is(':checked')){
            $(sub_div).show();
            $(sub_input).removeAttr('disabled');    
        }else{
            $(sub_div).hide();
            $(sub_input).attr('disabled','disabled').prop('disabled',true);    
        }
        
    });

    

    $(function () {

        $(".from,.to").keypress(function(event) {event.preventDefault();});

        $('.from').datepicker({
            onSelect: function(date) {

                $(".to").datepicker("option", "minDate", new Date($('.from').val()) ).val('');

                $('.generate_report').bootstrapValidator('revalidateField', 'from');
                $('.generate_report').bootstrapValidator('revalidateField', 'to');
            },
            format: 'MM/DD/YYYY',
            useCurrent: true,
            changeMonth: true,
            changeYear: true
        });

        $('.to').datepicker({
            onSelect: function(date) {
                $('.generate_report').bootstrapValidator('revalidateField', 'from');
                $('.generate_report').bootstrapValidator('revalidateField', 'to');
            },
            format: 'MM/DD/YYYY',
            useCurrent: true,
            changeMonth: true,
            changeYear: true
        });


    $(".inline_datepicker_to").datepicker("option", "minDate", new Date($('.inline_datepicker_from').val()) );
    $(".inline_datepicker_from").datepicker("option", "maxDate", new Date($('.inline_datepicker_to').val()) );

        
    });

    
    $( ".search_category_name" ).autocomplete({
      source: "/search/category_name",
      minLength: 1,
      response: function(event, ui) {
            if (ui.content.length === 0) {

                $(this).parent().addClass('has-error');
                $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $(".search_category_name_empty").show();
                $('.form_submit').hide();

            } else {
                $(".search_category_name_empty").hide();
                $('.form_submit').show();
            }
        },
      select: function(event, ui) {

        $('.search_category_id').val(ui.item.id);

        $('.unit_of_measure_container').empty();

        $('.measuring_units').val('');

        $.each( ui.item.units , function( key, value ) {

            if($('.measuring_units').val() == ''){
                $('.measuring_units').val(value.measures.name);
            }else{
                $('.measuring_units').val($('.measuring_units').val()+ ' x ' +value.measures.name);    
            }
            

            $('.unit_of_measure_container').append('<div class="col-sm-6"><div class="form-group"><label>'+value.measures.name+' ( in '+value.uom.name+' )</label><input type="hidden" name="measure_id[]" value='+value.measures.measure_id+'><input type="hidden" name="uom_id[]" value='+value.uom.uom_id+'> <input type="number" min="0" class="form-control" name="value[]" autocomplete="off"> </div></div>');
        });

      }
    });

    $( ".search_purchase_category_name" ).autocomplete({
      source: "/search/purchase_category_name",
      minLength: 1,
      response: function(event, ui) {
            if (ui.content.length === 0) {

                $(this).parent().addClass('has-error');
                $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $(".search_purchase_category_name_empty").show();
                $('.form_submit').hide();

            } else {
                $(".search_purchase_category_name_empty").hide();
                $('.form_submit').show();
            }
        },
      select: function(event, ui) {

        $('.search_category_id').val(ui.item.id);

        $('.unit_of_measure_container').empty();

        $('.search_purchase_cost,.search_selling_cost,.search_stock_quantity,.purchase_total,.grand_total,.closing_due').val('');

        $('.grand_total').val($('.opening_due').val());

        $('.stock_id,.purchase_stock_id').empty().append('<option selected="" disabled="" value="">- Select -</option>');

        $.each( ui.item.stocks , function( key, value ) {
            $('.stock_id,.purchase_stock_id').append('<option title="'+value.title+'" purchase_cost="'+value.purchase_cost+'" selling_cost="'+value.selling_cost+'" opening_stock="'+value.opening_stock+'" value='+key+'>'+value.dimention+'</option>');
            $('.stock_id_details').empty().html('( '+value.title+' )');
        });
      }
    });

    $( ".search_supplier_name" ).autocomplete({
      source: "/search/supplier_name",
      minLength: 1,
      response: function(event, ui) {
            if (ui.content.length === 0) {

                $(this).parent().addClass('has-error');
                $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $(".search_supplier_name_empty").show();
                $('.form_submit').hide();

            } else {
                $(".search_supplier_name_empty").hide();
                $('.form_submit').show();
            }
        },
      select: function(event, ui) {
        $('.search_supplier_id').val(ui.item.id);
        $('.search_supplier_name').val(ui.item.value);
        $('.search_supplier_address').val(ui.item.supplier_address);
        $('.search_supplier_contact1').val(ui.item.supplier_contact1);

        $('.opening_balance').val(parseFloat(ui.item.balance).toFixed(2));
        $('.opening_due').val(parseFloat(ui.item.due).toFixed(2));

        $('.grand_total').val(  parseFloat(ui.item.due-ui.item.balance).toFixed(2) );

        // var e = $.Event('keyup'); $('.change_purchase_quantity,.sales_payment,.stock_id').trigger(e);

      }
    });

    

    

    $( ".search_stock_name" ).autocomplete({
      source: "/search/stock_name",
      minLength: 1,
      response: function(event, ui) {
            if (ui.content.length === 0) {

                $(this).parent().addClass('has-error');
                $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $(".search_stock_name_empty").show();
                $('.form_submit').hide();

            } else {
                $(".search_stock_name_empty").hide();
                $('.form_submit').show();
            }
        },
      select: function(event, ui) {
        $('.search_stock_id').val(ui.item.stock_id);
        $('.search_stock_name').val(ui.item.value);
        $('.search_purchase_cost').val(ui.item.purchase_cost);
        $('.search_selling_cost').val(ui.item.selling_cost);
        $('.search_stock_quantity').val(ui.item.stock_quantity);
        $('.category_id').val(ui.item.category_id);

        
      }
    });

    $( ".search_stock_name" ).on('keyup',function(){
        $(".search_stock_name_empty").hide();
    });

    

    $('.sales_payment').on('keyup',function(){

        var payment =  parseFloat($(this).val()).toFixed(2);
        var grand_total =  parseFloat($('.grand_total').val()).toFixed(2);
        var opening_balance =  parseFloat($('.opening_balance').val()).toFixed(2);
        var opening_due =  parseFloat($('.opening_due').val()).toFixed(2);

        if( (grand_total - payment) > 0 ){
            $('.closing_due').val(grand_total - payment);
            $('.closing_balance').val(0);
        }
        else{
            $('.closing_due').val(0);
            $('.closing_balance').val( (payment - grand_total) || 0);
        }        
    });

    $('.purchase_payment').on('keyup',function(){

        var payment =  parseFloat($(this).val() || 0).toFixed(2);
        var grand_total =  parseFloat($('.grand_total').val() || 0).toFixed(2);
        var opening_balance =  parseFloat($('.opening_balance').val() || 0).toFixed(2);
        var opening_due =  parseFloat($('.opening_due').val() || 0).toFixed(2);

        if( (grand_total - payment) > 0 ){
            $('.closing_due').val(grand_total - payment);
            $('.closing_balance').val(0);
        }
        else{
            $('.closing_due').val(0);
            $('.closing_balance').val(payment - grand_total);
        }

        
    });

    /* Sales */

    $( ".search_customer_name" ).autocomplete({
      source: "/search/customer_name",
      minLength: 1,
      response: function(event, ui) {
            if (ui.content.length === 0) {

                $(this).parent().addClass('has-error');
                $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
                $(".search_customer_name_empty").show();
                $('.form_submit').hide();

            } else {
                $(".search_customer_name_empty").hide();
                $('.form_submit').show();
            }
        },
      select: function(event, ui) {
        $('.search_customer_id').val(ui.item.id);
        $('.search_customer_name').val(ui.item.value);
        $('.search_customer_address').val(ui.item.customer_address);
        $('.search_customer_contact1').val(ui.item.customer_contact1);

        $('.opening_balance').val(ui.item.balance);
        $('.opening_due').val(ui.item.due);

        var grand = parseFloat(ui.item.due - ui.item.balance).toFixed(2);
        $('.grand_total').val( grand );
      }
    });

    $( ".search_customer_name" ).on('keyup',function(){
        $(".search_customer_name_empty").hide();
    });

    /**/

    $('.create_customer').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    customer_name: {
                        validators: {
                            notEmpty: {
                                message: "Customer Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    },

                    customer_email: {
                        validators: {
                            
                            emailAddress: {
                                    message: 'Email should contain @ symbol ' 
                                },
                            regexp: {
                                    regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                                    message: 'Enter valid email address'
                                },
                            stringLength: {
                                max: 64,
                                message: 'Maximum 64 characters allowed'
                            }
                        }
                    },

                    customer_contact1: {
                        validators: {
                            notEmpty: {
                                message: "Mobile number is required "
                            },
                            stringLength: {
                                min: 10,max: 11,message: 'Mobile number should contain 10 to 11 digits '
                            },
                            regexp: {
                                regexp: '^([0|\[0-9]{1,5})?([7-9][0-9]{9})$',
                                message: 'Enter valid mobile number' 
                            }
                        }
                    },

                    customer_contact2: {
                        validators: {
                            stringLength: {
                                min: 10,max: 11,message: 'Mobile number should contain  10 to 11 digits '
                            },
                            regexp: {
                                regexp: '^([0|\[0-9]{1,5})?([7-9][0-9]{9})$',
                                message: 'Enter valid mobile number' 
                            }
                        }
                    },

                    customer_address: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            },
                            stringLength: {
                                min: 6,
                                max: 128,
                                message: 'Should range between 6 to 128 characters'
                            },
                                              
                        }
                    }
                }
    });

    $('.create_supplier').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    supplier_name: {
                        validators: {
                            notEmpty: {
                                message: "Customer Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    },

                    supplier_email: {
                        validators: {
                            
                            emailAddress: {
                                    message: 'Email should contain @ symbol ' 
                                },
                            regexp: {
                                    regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                                    message: 'Enter valid email address'
                                },
                            stringLength: {
                                max: 64,
                                message: 'Maximum 64 characters allowed'
                            }
                        }
                    },

                    supplier_contact1: {
                        validators: {
                            notEmpty: {
                                message: "Mobile number is required "
                            },
                            stringLength: {
                                min: 10,max: 11,message: 'Mobile number should contain 10 to 11 digits '
                            },
                            regexp: {
                                regexp: '^([0|\[0-9]{1,5})?([7-9][0-9]{9})$',
                                message: 'Enter valid mobile number' 
                            }
                        }
                    },

                    supplier_contact2: {
                        validators: {
                            stringLength: {
                                min: 10,max: 11,message: 'Mobile number should contain  10 to 11 digits '
                            },
                            regexp: {
                                regexp: '^([0|\[0-9]{1,5})?([7-9][0-9]{9})$',
                                message: 'Enter valid mobile number' 
                            }
                        }
                    },

                    supplier_address: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            },
                            stringLength: {
                                min: 6,
                                max: 128,
                                message: 'Should range between 6 to 128 characters'
                            },
                                              
                        }
                    }
                }
    });
    
    $('.create_brand').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    brand_name: {
                        validators: {
                            notEmpty: {
                                message: "Brand Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    }
                }
    });
    
    $('.create_status').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    status_name: {
                        validators: {
                            notEmpty: {
                                message: "Status Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    }
                }
    });
    
    $('.create_classification').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    classification_name: {
                        validators: {
                            notEmpty: {
                                message: "Classification Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    }
                }
    });
    
    $('.create_attribute').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    attribute_name: {
                        validators: {
                            notEmpty: {
                                message: "Attribute Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    }
                }
    });

    $('.create_category').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    category_name: {
                        validators: {
                            notEmpty: {
                                message: "Category Name is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    },
                    'measures[]': {
                        validators: {
                            notEmpty: {
                                message: 'Atleast one measure is required'
                            },                
                        }
                    }
                }
    });

    $('.create_stock').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    category_name: {
                        validators: {
                            notEmpty: {
                                message: "Category Name is required "
                            }
                        }
                    },
                    stock_name: {
                        validators: {
                            notEmpty: {
                                message: "Stock Code is required "
                            },
                            stringLength: {
                                min: 3,max: 64,message: 'Should range between 3 to 64 characters'
                            }
                        }
                    },
                    category_id: {
                        validators: {
                            notEmpty: {
                                message: 'Stock Category is required'
                            },                
                        }
                    },
                    supplier_id: {
                        validators: {
                            notEmpty: {
                                message: 'Supplier name is required'
                            },                
                        }
                    },
                    purchase_cost: {
                        validators: {
                            numeric: {
                                message: 'Enter valid number',
                                thousandsSeparator: '',
                                decimalSeparator: '.'
                            }                
                        }
                    },
                    selling_cost: {
                        validators: {
                            numeric: {
                                message: 'Enter valid number',
                                thousandsSeparator: '',
                                decimalSeparator: '.'
                            }                
                        }
                    },

                }
    });
    
    $('.create_product').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    sku: {
                        validators: {
                            notEmpty: {
                                message: "SKU is required "
                            }
                        }
                    },
                    description: {
                        validators: {
                            notEmpty: {
                                message: "Description is required "
                            },
                            stringLength: {
                                min: 3,message: 'Minimum 3 characters'
                            }
                        }
                    },
                    classification_id: {
                        validators: {
                            notEmpty: {
                                message: 'Classification is required'
                            },                
                        }
                    },
                    supplier_id: {
                        validators: {
                            notEmpty: {
                                message: 'Supplier name is required'
                            },                
                        }
                    },
                    brand: {
                        validators: {
                            notEmpty: {
                                message: 'Brand name is required'
                            },                
                        }
                    },
                    code: {
                        validators: {
                            notEmpty: {
                                message: 'Code is required'
                            },                
                        }
                    },
                    part_number: {
                        validators: {
                            notEmpty: {
                                message: 'Part Number is required'
                            },                
                        }
                    },
                    cost: {
                        validators: {
                            notEmpty: {
                                message: 'Cose is required'
                            },
                            numeric: {
                                message: 'Enter valid number',
                                thousandsSeparator: '',
                                decimalSeparator: '.'
                            }                
                        }
                    },
                    selling_price: {
                        validators: {
                            notEmpty: {
                                message: 'Selling Price is required'
                            },
                            numeric: {
                                message: 'Enter valid number',
                                thousandsSeparator: '',
                                decimalSeparator: '.'
                            }                
                        }
                    },
                    retail_price: {
                        validators: {
                            notEmpty: {
                                message: 'Retail Price is required'
                            },
                            numeric: {
                                message: 'Enter valid number',
                                thousandsSeparator: '',
                                decimalSeparator: '.'
                            }                
                        }
                    },
                    reorder_point: {
                        validators: {
                            notEmpty: {
                                message: 'Reorder point is required'
                            },                
                        }
                    },
                    min_qnty: {
                        validators: {
                            notEmpty: {
                                message: 'Minimum Quantity is required'
                            },                
                        }
                    },
                    max_qnty: {
                        validators: {
                            notEmpty: {
                                message: 'Maximum Quantity is required'
                            },                
                        }
                    },
                }
    });

    $('.create_sales').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    customer_name: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },
                    stock_name: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },
                    sales_quantity: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            },
                            integer: {
                                min:1,
                                message:'Invalid Input'
                            }
                        }
                    },
                    payment: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },

                }
    });

    $('.create_purchase').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    supplier_name: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },
                    stock_name: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },
                    purchase_quantity: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            },
                            integer: {
                                min:1,
                                message:'Invalid Input'
                            }
                        }
                    },
                    payment: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },

                }
    });


    $('.create_kit').bootstrapValidator({
                
        ignore: ":hidden",
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            kit_sku: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    }
                }
            },
            kit_title: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    }
                }
            },
            product_code: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    },
                }
            },
            product_sku: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    },
                }
            },
            product_name: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    }
                }
            },
            product_quantity: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    },
                    integer: {
                        min:1,
                        message:'Invalid Input'
                    }
                }
            },

        }
    });


    $('.create_audit').bootstrapValidator({
                
        ignore: ":hidden",
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            warehouse_id: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    }
                }
            },
            location: {
                validators: {
                    notEmpty: {
                        message: "Input Required"
                    }
                }
            }

        }
    });


    $('.generate_report').bootstrapValidator({
                
                ignore: ":hidden",
                excluded: ':disabled',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {

                    report_type: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            }
                        }
                    },
                    from: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            },
                            date: {
                                format: 'MM/DD/YYYY',
                                message: "Invalid Date"
                            }
                        }
                    },
                    to: {
                        validators: {
                            notEmpty: {
                                message: "Input Required"
                            },
                            date: {
                                format: 'MM/DD/YYYY',
                                message: "Invalid Date"
                            }
                        }
                    },

                }
    });
    
});
