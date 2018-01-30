class ProfilePhotoUploader < CarrierWave::Uploader::Base
  # if Rails.env.test?
  #   storage :file
  # else
    storage :fog
  # end
#
# # to be checked later:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
