from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect

from django.urls import reverse

from .models import Book

# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")

def detail(request):
    book_list = Book.objects.order_by('-pub_date')[:5]
    context = {'book_list':book_list}
    return render(request, 'lib/detail.html', context)

def addBook(request):
    if request.method == 'POST':
        temp_name = request.POST['name']
        temp_author = request.POST['author']
        temp_publisher = request.POST['publisher']

    from django.utils import timezone
    temp_book = Book(name=temp_name, author=temp_author, publisher=temp_publisher, pub_date=timezone.now())
    temp_book.save()

    return HttpResponseRedirect(reverse('lib:detail'))        

def deleteBook(request, book_id):
    bookID = book_id
    Book.objects.filter(id=bookID).delete()
    return HttpResponseRedirect(reverse('lib:detail')) 


