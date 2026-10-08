# Alpha masks for OBS "Image Mask/Blend" (Type: Alpha Mask (Alpha Channel)).  pip install pillow
from PIL import Image,ImageDraw
def m(n,w,h,r):
    S=4;i=Image.new('L',(w*S,h*S),0);ImageDraw.Draw(i).rounded_rectangle((0,0,w*S-1,h*S-1),r*S,fill=255)
    o=Image.new('RGBA',(w,h),(255,255,255,0));o.putalpha(i.resize((w,h),Image.LANCZOS));o.save(f'../assets/masks/{n}.png')
m('circle-800',800,800,400);m('rounded-square-800',800,800,115);m('rounded-16x9-1600',1600,900,58)
